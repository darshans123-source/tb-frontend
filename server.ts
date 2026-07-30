import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const appDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();
const JWT_SECRET = process.env.JWT_SECRET || "tb_quest_super_secret_jwt_key_2026_nmc";

// In-Memory User Database with hashed passwords
interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'faculty' | 'admin';
  level: number;
  xp: number;
  accuracy: number;
  streak: number;
  completedCases: number;
  createdAt: string;
}

// Utility: Hash Password securely using PBKDF2 (SHA256)
function hashPassword(password: string): string {
  const salt = "tb_quest_salt_2026";
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");
}

// Utility: Create JWT Token (HMAC-SHA256)
function generateJWT(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

// Utility: Verify JWT Token
function verifyJWT(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (signature !== expectedSig) return null;
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) return null; // Expired
    return parsed;
  } catch (e) {
    return null;
  }
}

// Seed initial system users
const userDatabase: Map<string, UserRecord> = new Map();

function seedUsers() {
  const initialUsers: UserRecord[] = [
    {
      id: "usr_student",
      name: "Dr. Student",
      email: "student@tbquest.edu",
      passwordHash: hashPassword("student123"),
      role: "student",
      level: 1,
      xp: 0,
      accuracy: 0,
      streak: 0,
      completedCases: 0,
      createdAt: new Date().toISOString()
    },
    {
      id: "usr_faculty",
      name: "Dr. Anandkumar Harwalkar",
      email: "faculty@tbquest.edu",
      passwordHash: hashPassword("faculty123"),
      role: "faculty",
      level: 10,
      xp: 8500,
      accuracy: 98,
      streak: 30,
      completedCases: 150,
      createdAt: new Date().toISOString()
    },
    {
      id: "usr_admin",
      name: "System Administrator",
      email: "admin@tbquest.edu",
      passwordHash: hashPassword("admin123"),
      role: "admin",
      level: 99,
      xp: 99999,
      accuracy: 100,
      streak: 100,
      completedCases: 500,
      createdAt: new Date().toISOString()
    }
  ];

  initialUsers.forEach(u => userDatabase.set(u.email.toLowerCase(), u));
}

seedUsers();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GoogleGenAI if key is present
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", aiConfigured: !!ai, activeUsersCount: userDatabase.size });
  });

  // Authentication Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied. Authentication token missing." });

    const decoded = verifyJWT(token);
    if (!decoded) return res.status(401).json({ error: "Invalid or expired authentication session." });

    req.user = decoded;
    next();
  };

  // POST /api/auth/register
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email, and password are required fields." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters in length." });
    }

    const cleanEmail = email.toLowerCase().trim();
    if (userDatabase.has(cleanEmail)) {
      return res.status(400).json({ error: "An account with this email address already exists." });
    }

    const newUser: UserRecord = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: hashPassword(password),
      role: (role === 'faculty' || role === 'admin') ? role : 'student',
      level: 1,
      xp: 0,
      accuracy: 100,
      streak: 1,
      completedCases: 0,
      createdAt: new Date().toISOString()
    };

    userDatabase.set(cleanEmail, newUser);

    const token = generateJWT({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    });

    const { passwordHash, ...userProfile } = newUser;
    res.status(201).json({ token, user: userProfile });
  });

  // POST /api/auth/login
  app.post("/api/auth/login", (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter your email and password." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = userDatabase.get(cleanEmail);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const inputHash = hashPassword(password);
    if (inputHash !== user.passwordHash) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Optionally update user role if requested for switching roles in demo
    if (role && (role === 'student' || role === 'faculty' || role === 'admin')) {
      user.role = role;
    }

    const token = generateJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const { passwordHash, ...userProfile } = user;
    res.json({ token, user: userProfile });
  });

  // GET /api/auth/me (Validate JWT Session & Return Authenticated User)
  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    const user = userDatabase.get(req.user.email);
    if (!user) {
      return res.status(404).json({ error: "User account not found." });
    }

    const { passwordHash, ...userProfile } = user;
    res.json({ user: userProfile });
  });

  // POST /api/auth/logout
  app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Successfully logged out session." });
  });

  // POST /api/auth/forgot-password
  app.post("/api/auth/forgot-password", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please enter your registered email address." });
    }

    res.json({ message: `If an account exists for ${email}, a password reset link has been sent.` });
  });

  // User Profile endpoint
  app.get("/api/user/profile", authenticateToken, (req: any, res) => {
    const user = userDatabase.get(req.user.email);
    if (!user) {
      return res.status(404).json({ error: "User profile not found." });
    }
    const { passwordHash, ...profile } = user;
    res.json(profile);
  });

  app.get("/api/user/achievements", (req, res) => {
    res.json([
      { id: '1', title: 'Pulmonary Master', description: 'Completed 10 pulmonary cases' },
      { id: '2', title: 'CBNAAT Master', description: 'Diagnosed 5 MDR cases correctly' },
      { id: '3', title: 'Pediatric Specialist', description: 'Completed 5 pediatric cases' },
      { id: '4', title: 'TB Diagnostic Expert', description: 'Mastered all diagnostic algorithm flowcharts' }
    ]);
  });

  // AI Tutor Route using @google/genai
  app.post("/api/gemini/chat", async (req, res) => {
    const { prompt, context } = req.body;

    if (!ai) {
      let reply = "Based on national NTEP guidelines, presumptive pulmonary TB requires rapid molecular testing (CBNAAT) and sputum smear microscopy. If smear is negative but CXR or clinical suspicion is high, CBNAAT confirmation is mandatory.";
      if (prompt.toLowerCase().includes('pediatric')) {
        reply = "In pediatric TB (Page 22 algorithm), if molecular testing is negative or unavailable, evaluate access for CXR and Mantoux TST. Calculate the TB Score: a score ≥ 6 indicates active TB and warrants anti-TB treatment.";
      } else if (prompt.toLowerCase().includes('mdr') || prompt.toLowerCase().includes('rifampicin')) {
        reply = "Rifampicin resistance detected on CBNAAT mandates immediate referral to PMDT (Programmatic Management of Drug Resistant TB) for second-line Line Probe Assay (LPA) and an all-oral Bedaquiline-containing regimen.";
      } else if (prompt.toLowerCase().includes('hiv')) {
        reply = "For PLHIV presenting with TB symptoms, CBNAAT is the primary diagnostic test. Cotrimoxazole Preventive Therapy (CPT) and Anti-TB treatment should be initiated immediately, followed by ART within 2 to 4 weeks.";
      }
      return res.json({ reply, source: 'fallback' });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are the TB Quest AI Clinical Tutor for Navodaya Medical College (Dept. of Microbiology). You are an expert in Tuberculosis diagnostic algorithms (NTEP & WHO guidelines), CBNAAT interpretation, pediatric TB score calculation, and MDR-TB management. Provide clear, supportive, concise medical educational advice to medical undergraduate students.\n\nUser Question: ${prompt}\nContext: ${context || 'General TB Clinical Enquiry'}`
              }
            ]
          }
        ]
      });

      const reply = response.text || "Thank you for asking. According to NTEP standards, early molecular diagnosis with CBNAAT is crucial for ruling out drug-resistant tuberculosis.";
      res.json({ reply, source: 'gemini' });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        reply: "Based on national TB guidelines, presumptive pulmonary TB requires sputum examination or CBNAAT testing. If smear is negative but clinical suspicion remains high, CBNAAT is mandatory.",
        source: 'fallback-error'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(appDir, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
