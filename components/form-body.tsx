"use client";

import { Plus } from "lucide-react";
import Button from "./button";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { QuestionItem } from "./question";
import { Question, QuestionType } from "@/constants/question-types";
import { AnimatePresence } from "framer-motion";

interface FormBody {
  formData: Question[];
  setFormData: (questions: Question[]) => void;
}

export default function FormBody({ formData, setFormData }: FormBody) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "short" as QuestionType,
      question: "",
      helpText: "",
      required: true,
    };
    setFormData([...formData, newQuestion]);
    console.log(formData, "formData");
  };

  const updateQuestion = (
    id: number,
    field: string,
    value: string | boolean | number | string[]
  ) => {
    setFormData(
      formData.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const removeQuestion = (id: number) => {
    setFormData(formData.filter((q) => q.id !== id));
  };

  const addOption = (questionId: number) => {
    const question = formData.find((q) => q.id === questionId);
    if (question) {
      updateQuestion(questionId, "options", [...(question.options || []), ""]);
    }
  };

  const updateOption = (questionId: number, index: number, value: string) => {
    const question = formData.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [...question.options!];
      newOptions[index] = value;
      updateQuestion(questionId, "options", newOptions);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formData.findIndex((item) => item.id === active.id);
      const newIndex = formData.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(formData, oldIndex, newIndex);
      setFormData(newItems);
    }
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="space-y-4 w-full px-2 pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={formData.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4  ">
              <AnimatePresence mode="popLayout">
                {formData.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    updateQuestion={updateQuestion}
                    removeQuestion={removeQuestion}
                    addOption={addOption}
                    updateOption={updateOption}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <Button onClick={addQuestion} icon={<Plus size={16} />}>
        <span className="font-semibold text-[#0D0D0D]">Add Question</span>
      </Button>
    </div>
  );
}
