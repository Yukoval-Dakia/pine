export interface Message {
  _id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface NewMessage {
  content: string;
  author?: string;
  isAnonymous: boolean;
  recaptchaToken: string;
} 