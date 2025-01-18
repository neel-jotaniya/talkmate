export interface PersonalInfo {
  name: string;
  age: number;
  sex: string;
  location: string;
  education: string;
  job_title: string;
  company_name: string;
}

export interface OnboardingData {
  personal_info: PersonalInfo;
  questionnaire_responses: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}