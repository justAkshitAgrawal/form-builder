"use client";

import { Question } from "@/constants/question-types";
import { MoveUpRight } from "lucide-react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Label } from "./ui/label";

interface FormHeaderProps {
  previewDisabled?: boolean;
  handleSaveForm: (questions: Question[]) => void;
  formData: Question[];
  formName: string;
  setFormName: (name: string) => void;
  previewMode?: boolean;
  progress?: number;
}

export default function FormHeader(props: FormHeaderProps) {
  const {
    previewDisabled,
    handleSaveForm,
    formData,
    formName,
    setFormName,
    previewMode,
    progress,
  } = props;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3">
      <div className="flex-1">
        <Input
          className={`text-sm text-gray-500 border-none shadow-none focus-visible:ring-0 p-0 h-fit placeholder:text-gray-400 placeholder:font-normal ${
            formName !== "Untitled form" && "text-black font-semibold"
          } ${previewMode && "text-black"}`}
          placeholder="Form name"
          disabled={previewMode}
          maxLength={40}
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>
      {!previewMode ? (
        <button
          onClick={() => {
            handleSaveForm(formData);
          }}
          disabled={previewDisabled}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-foreground font-semibold disabled:text-gray-400"
        >
          <span>Preview</span>
          <MoveUpRight size={16} />
        </button>
      ) : (
        <div className="">
          <Label>Form completeness - {progress?.toFixed(0) || 0}%</Label>
          <Progress color="#00AA45" value={progress} className="flex-1" />
        </div>
      )}
    </div>
  );
}
