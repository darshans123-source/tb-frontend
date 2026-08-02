import { CaseType } from '../types';
import HospitalEMREngine from './HospitalEMREngine';

interface CaseEngineProps {
  caseType: CaseType;
  currentUserId?: string | null;
  onFinishCase: (score: number, xp: number, badge?: string) => void;
  onBack: () => void;
}

export default function CaseEngine({ currentUserId, onFinishCase, onBack }: CaseEngineProps) {
  return (
    <HospitalEMREngine
      currentUserId={currentUserId}
      onFinishCase={onFinishCase}
      onBack={onBack}
    />
  );
}
