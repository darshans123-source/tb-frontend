import { AI_CHAT_DATA, AI_QUIZ_POOL, AI_GENERATED_CASES, AIChatPair, AIQuizQuestion, AICaseTemplate } from '../data/aiMockData';
import { apiFetch } from '../api/client';

class AIService {
  /**
   * Responds to user clinical queries using Render backend Gemini endpoint or local fallback dataset.
   */
  async askChat(prompt: string, context?: string): Promise<{ reply: string; source: string }> {
    // Try Render backend AI endpoint first via API client
    try {
      const data = await apiFetch<{ reply: string; source: string }>('/gemini/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt, context })
      });
      if (data && data.reply) {
        return data;
      }
    } catch (e) {
      console.warn('Backend AI API fetch note, using local dataset fallback:', e);
    }

    // Simulated short network delay (200ms) for natural feel
    await new Promise(resolve => setTimeout(resolve, 200));

    const lowerPrompt = prompt.toLowerCase();

    // Find best matching keyword response
    const match = AI_CHAT_DATA.find(item =>
      item.keywords.some(kw => lowerPrompt.includes(kw))
    );

    if (match) {
      return {
        reply: match.response,
        source: 'TB Quest Clinical Knowledge Base'
      };
    }

    // Default intelligent clinical response
    return {
      reply: `Based on national NTEP and CDC guidelines, presumptive pulmonary TB requires rapid molecular testing (CBNAAT / Xpert MTB/RIF) and sputum smear microscopy. If smear is negative but clinical suspicion remains high, CBNAAT confirmation is mandatory to guide appropriate therapy.`,
      source: 'NTEP Standard Clinical Protocol'
    };
  }

  /**
   * Generates randomized quizzes from local pool.
   */
  async generateQuiz(category?: string): Promise<AIQuizQuestion[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    // Return shuffled quiz pool
    const shuffled = [...AI_QUIZ_POOL].sort(() => 0.5 - Math.random());
    return shuffled;
  }

  /**
   * Generates virtual patient case from local dataset.
   */
  async generateCase(type?: string): Promise<AICaseTemplate> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const matching = type
      ? AI_GENERATED_CASES.filter(c => c.type === type)
      : AI_GENERATED_CASES;
    const selected = matching.length > 0
      ? matching[Math.floor(Math.random() * matching.length)]
      : AI_GENERATED_CASES[0];
    return selected;
  }

  /**
   * Provides personalized learning recommendations based on student metrics.
   */
  async getRecommendations(completedCount: number, accuracy: number): Promise<{ recommendations: string[]; weakAreas: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const weakAreas: string[] = [];
    const recommendations: string[] = [];

    if (accuracy < 85) {
      weakAreas.push('Rifampicin Resistance Interpretation (MDR-TB)');
      recommendations.push('Review Module 4: Drug-Resistant TB & MDR Pathways');
    }

    if (completedCount < 5) {
      weakAreas.push('Pediatric Composite Scoring');
      recommendations.push('Practice Level 3: Pediatric Diagnostic Algorithm & Score Tool');
    }

    if (recommendations.length === 0) {
      recommendations.push('Master Level 5: Time-Critical Emergency Missions');
      recommendations.push('Review Advanced HIV-TB Co-infection Guidelines');
    }

    return { recommendations, weakAreas };
  }

  /**
   * Explains decision choices.
   */
  async explainDecision(question: string, choiceLabel: string, isCorrect: boolean): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (isCorrect) {
      return `Correct! Choosing "${choiceLabel}" aligns with NTEP 2024 standards for ${question}.`;
    }
    return `Incorrect. Choosing "${choiceLabel}" deviates from guideline protocols. Molecular diagnostic testing (CBNAAT) should not be delayed.`;
  }
}

export const aiService = new AIService();
