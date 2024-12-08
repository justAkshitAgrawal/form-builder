"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Question, questionTypes } from "../constants/question-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import * as Icons from "lucide-react";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";

interface QuestionProps {
  question: Question;
  updateQuestion: (
    id: number,
    field: string,
    value: string | boolean | number | string[]
  ) => void;
  removeQuestion: (id: number) => void;
  addOption?: (questionId: number) => void;
  updateOption?: (questionId: number, index: number, value: string) => void;
}

export function QuestionItem({
  question,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
}: QuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const currentType = questionTypes.find(
    (type) => type.value === question.type
  );
  const TypeIcon = currentType
    ? Icons[currentType.icon as keyof typeof Icons]
    : Icons.HelpCircle;

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        willChange: "transform, opacity, height",
      }}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: {
          height: { duration: 0.1, ease: "easeOut" },
          opacity: { duration: 0.15, ease: "easeOut" },
        },
      }}
      exit={{
        opacity: 0,
        height: 0,
        transition: {
          height: { duration: 0.1, ease: "easeInOut" },
          opacity: { duration: 0.1, ease: "easeOut" },
        },
      }}
      //   @ts-expect-error - css module
      className="space-y-4 p-4 border rounded-2xl bg-white transition-colors w-full hover:bg-[#FAFBFC]"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start ">
          <div className="flex flex-col flex-1">
            <Input
              placeholder="Write a question"
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
              className={`lg:text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-fit`}
            />
            <Input
              placeholder="Write a help text or caption (leave empty if not needed)"
              value={question.helpText || ""}
              onChange={(e) =>
                updateQuestion(question.id, "helpText", e.target.value)
              }
              className="text-xs lg:text-sm text-gray-500 border-none shadow-none focus-visible:ring-0 p-0 h-fit"
            />
          </div>

          <div className="flex items-center mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center -gap-2 w-14 h-fit py-1 mr-1"
                >
                  {/* @ts-expect-error icons are not exported from lucide-react */}
                  <TypeIcon size={16} className="" />
                  <Icons.ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {questionTypes.map((type) => {
                  const Icon = Icons[type.icon as keyof typeof Icons];
                  return (
                    <DropdownMenuItem
                      key={type.value}
                      onClick={() =>
                        updateQuestion(question.id, "type", type.value)
                      }
                    >
                      {/* @ts-expect-error icons are not exported from lucide-react */}
                      <Icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:text-gray-600"
            >
              <GripVertical className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {question.type === "single" && (
        <div className="space-y-2">
          {question.options?.map((option: string, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 rounded-full border border-black flex"></div>
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  updateOption?.(question.id, index, e.target.value)
                }
                className=""
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addOption?.(question.id)}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
      )}
      {(question.type === "short" ||
        question.type === "url" ||
        question.type == "number") && (
        <Input
          disabled
          className="disabled:bg-gray-100 disabled:border-gray-200"
        />
      )}
      {question.type === "long" && (
        <Textarea
          disabled
          className="resize-none disabled:bg-gray-100 disabled:border-gray-200"
        />
      )}
    </motion.div>
  );
}
