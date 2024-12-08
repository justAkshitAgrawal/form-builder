"use client";

import FormBody from "@/components/form-body";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormPreview from "@/components/form-preview";
import { Button } from "@/components/ui/button";
import { Question } from "@/constants/question-types";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [step, setStep] = useState<"create" | "preview">("create");
  const [formData, setFormData] = useState<Question[]>([]);
  const [formName, setFormName] = useState("Untitled form");
  const [progress, setProgress] = useState(0);

  const handleSaveForm = (questions: Question[]) => {
    const invalidQuestions = formData.filter((q) => !q.question.trim());

    if (invalidQuestions.length > 0) {
      toast.error("Please fill in all question titles before previewing");
      return;
    }

    if (formName === "Untitled form" || !formName.trim()) {
      toast.error("Please enter a form name before previewing");
      return;
    }
    setFormData(questions);
    setStep("preview");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {step === "create" ? (
        <div className="container h-screen border-x border-gray-200 max-w-[640px] flex flex-col justify-between">
          <div className="flex flex-col gap-4 pb-4">
            <FormHeader
              formData={formData}
              previewDisabled={formData.length === 0}
              handleSaveForm={handleSaveForm}
              formName={formName}
              setFormName={setFormName}
            />
            <FormBody formData={formData} setFormData={setFormData} />
          </div>
          <FormFooter disableSave={formData.length === 0} />
        </div>
      ) : (
        <div className="container h-screen border-x border-gray-200 max-w-[640px] flex flex-col justify-between">
          <div>
            <FormHeader
              formData={formData}
              previewDisabled={formData.length === 0}
              handleSaveForm={handleSaveForm}
              formName={formName}
              setFormName={setFormName}
              previewMode
              progress={progress}
            />
            <FormPreview questions={formData} setProgress={setProgress} />
          </div>
          <Button variant="outline" onClick={() => setStep("create")}>
            Back to Editor
          </Button>
        </div>
      )}
    </div>
  );
}
