"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Question } from "@/constants/question-types";

export default function FormPreview({
  questions,
  setProgress,
}: {
  questions: Question[];
  setProgress: (progress: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const calculateProgress = () => {
    const requiredQuestions = questions.filter(
      (q) => q.required && q.question.trim()
    );
    if (requiredQuestions.length === 0) return 0;

    const answeredQuestions = requiredQuestions.filter(
      (q) =>
        answers[q.id] !== undefined &&
        answers[q.id] !== null &&
        answers[q.id].trim() !== ""
    );

    const progress = Math.round(
      (answeredQuestions.length / requiredQuestions.length) * 100
    );
    setProgress(progress);
    return progress;
  };

  const updateAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    calculateProgress();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Form submitted successfully!");
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "short":
        return (
          <Input
            value={answers[question.id] || ""}
            onChange={(e) => {
              updateAnswer(question.id, e.target.value);
              calculateProgress();
            }}
          />
        );
      case "long":
        return (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => {
              updateAnswer(question.id, e.target.value);
              calculateProgress();
            }}
            className="resize-none"
          />
        );
      case "single":
        return (
          <RadioGroup
            onValueChange={(value) => updateAnswer(question.id, value)}
            value={answers[question.id]}
          >
            {question.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-${index}`}
                  className=""
                />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "number":
        return (
          <Input
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => {
              updateAnswer(question.id, e.target.value);
              calculateProgress();
            }}
          />
        );
      case "url":
        return (
          <Input
            type="url"
            value={answers[question.id] || ""}
            onChange={(e) => {
              updateAnswer(question.id, e.target.value);
              calculateProgress();
            }}
          />
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Thank you for submitting the form!
        </h2>
        <p className="text-gray-600">Your responses have been recorded.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-4 flex flex-col">
      {Array.isArray(questions) &&
        questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <div className="flex flex-col items-start">
              <Label className="text-sm">{question.question}</Label>
              <Label className="text-[#0D0D0D] font-normal text-xs">
                {question.helpText}
              </Label>
            </div>
            {renderQuestion(question)}
          </div>
        ))}

      <Button
        type="submit"
        className="place-self-end bg-[#00AA45] border border-[#1E874B] hover:bg-[#1E874B]"
        disabled={Object.keys(answers).length !== questions.length}
      >
        <span className="hidden">{calculateProgress()}</span>
        Submit Form
      </Button>
    </form>
  );
}
