export interface PartyContext {
  eventType?: string;
  date?: string;
  time?: string;
  audienceType?: string;
  audienceSize?: number;
  ageRange?: string;
  venue?: string;
  location?: string;
  budget?: number;
  style?: string;
  preferences?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ServiceRecommendation {
  productId: string;
  quantity: number;
  reason: string;
  lineTotal: number;
}

export interface AssistantTurn {
  source: 'llm' | 'demo';
  message: string;
  context: PartyContext;
  recommendations: ServiceRecommendation[];
  estimatedTotal: number;
  missing: string[];
}
