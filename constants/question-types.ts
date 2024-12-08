export const questionTypes = [
  { value: "short", label: "Short Answer", icon: "Minus" },
  { value: "long", label: "Long Answer", icon: "Equal" },
  { value: "single", label: "Single Select", icon: "CircleDot" },
  { value: "number", label: "Number", icon: "Hash" },
  { value: "url", label: "URL", icon: "Link" },
] as const;

export type QuestionType = (typeof questionTypes)[number]["value"];

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  helpText?: string;
  options?: string[];
  required: boolean;
}
