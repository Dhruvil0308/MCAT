"use client";
import React, { useState } from "react";
import Link from "next/link";

interface FormData {
  who?: string;
  grade?: string;
  child_name?: string;
  help_type?: string[];
  update_frequency?: string;
  teaching_style?: string;
  tone?: string;
  usage_mode?: string;
  due_timing?: string;
  reminder_frequency?: string;
  parent_phone?: string;
  student_phone?: string;
  // Student fields
  student_grade?: string;
  name?: string;
  student_help_type?: string[];
  response_style?: string;
  student_tone?: string;
  wants_reminders?: string;
  reminder_time?: string;
  student_phone_number?: string;
  wants_parent?: string;
  parent_phone_number?: string;
}

interface FlowStep {
  id: string;
  type: "select" | "text" | "multiselect";
  question: string;
  options?: string[];
  condition?: Record<string, string | string[]>;
}

const FLOW: FlowStep[] = [
  {
    id: "who",
    type: "select",
    question: "Who are you?",
    options: ["I'm a parent or guardian", "I'm a student"]
  },
  // Parent flow
  {
    id: "grade",
    type: "select",
    question: "What grade is your child in?",
    options: ["K–2", "3–5", "6–8", "9–10", "11–12"],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "child_name",
    type: "text",
    question: "What's your child's first name?",
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "help_type",
    type: "multiselect",
    question: "How much help does your child typically need?",
    options: [
      "Occasional reminders",
      "Concept explanations",
      "Homework walkthroughs",
      "Essay writing help",
      "Test prep / regular studying",
      "General accountability"
    ],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "update_frequency",
    type: "select",
    question: "How often do you want updates on your child's conversations with their AI tutor?",
    options: [
      "A couple times a day",
      "Daily digest",
      "Weekly digest",
      "No updates"
    ],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "teaching_style",
    type: "select",
    question: "How should the AI tutor teach your child?",
    options: [
      "Just give the answer",
      "Give answer + short explanation",
      "Full step-by-step explanation",
      "Ask guiding questions only",
      "Adapt based on student confidence"
    ],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "tone",
    type: "select",
    question: "What tone should the tutor use with your child?",
    options: [
      "Straightforward and efficient",
      "Friendly and conversational",
      "Encouraging and positive",
      "Gentle and empathetic",
      "Let the AI decide based on context"
    ],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "usage_mode",
    type: "select",
    question: "How do you want to use Textor?",
    options: [
      "I'll text Textor what to help my student with (e.g., a specific assignment)",
      "My student will text Textor independently for questions or homework help"
    ],
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "due_timing",
    type: "select",
    question: "When should assigned tasks be completed?",
    options: [
      "By the end of the day",
      "At a specific time (you'll include it in your message)"
    ],
    condition: {
      who: "I'm a parent or guardian",
      usage_mode: "I'll text Textor what to help my student with (e.g., a specific assignment)"
    }
  },
  {
    id: "reminder_frequency",
    type: "select",
    question: "How often should we remind your child about assigned tasks?",
    options: [
      "Once at the start",
      "A couple gentle nudges",
      "Repeatedly until it's done",
      "No reminders—just one message"
    ],
    condition: {
      who: "I'm a parent or guardian",
      usage_mode: "I'll text Textor what to help my student with (e.g., a specific assignment)"
    }
  },
  {
    id: "parent_phone",
    type: "text",
    question: "What's your phone number?",
    condition: { who: "I'm a parent or guardian" }
  },
  {
    id: "student_phone",
    type: "text",
    question: "What's your child's phone number?",
    condition: { who: "I'm a parent or guardian" }
  },
  // Student flow
  {
    id: "student_grade",
    type: "select",
    question: "What grade are you in?",
    options: ["K–2", "3–5", "6–8", "9–10", "11–12"],
    condition: { who: "I'm a student" }
  },
  {
    id: "name",
    type: "text",
    question: "What's your first name?",
    condition: { who: "I'm a student" }
  },
  {
    id: "student_help_type",
    type: "multiselect",
    question: "What kind of help are you looking for?",
    options: [
      "Homework answers",
      "Explanations and walk-throughs",
      "Essay help",
      "Studying for quizzes or tests",
      "Just reminders to get stuff done",
      "I'm not sure yet"
    ],
    condition: { who: "I'm a student" }
  },
  {
    id: "response_style",
    type: "select",
    question: "How do you want the tutor to respond to your questions?",
    options: [
      "Just give me the answer",
      "Show me the steps with the answer",
      "Teach me how to figure it out",
      "Ask me guiding questions instead of just telling"
    ],
    condition: { who: "I'm a student" }
  },
  {
    id: "student_tone",
    type: "select",
    question: "What tone should the tutor use with you?",
    options: [
      "Straight-up and efficient",
      "Friendly and casual",
      "Chill but helpful",
      "Encouraging and positive",
      "Doesn't matter—whatever gets it done"
    ],
    condition: { who: "I'm a student" }
  },
  {
    id: "wants_reminders",
    type: "select",
    question: "Do you want reminders to study or do homework?",
    options: ["Yes", "No"],
    condition: { who: "I'm a student" }
  },
  {
    id: "reminder_time",
    type: "select",
    question: "When should we remind you?",
    options: ["3–5 PM", "5–7 PM", "7–9 PM", "Custom time"],
    condition: {
      who: "I'm a student",
      wants_reminders: "Yes"
    }
  },
  {
    id: "student_phone_number",
    type: "text",
    question: "What's your phone number?",
    condition: { who: "I'm a student" }
  },
  {
    id: "wants_parent",
    type: "select",
    question: "Do you want a parent to also get updates?",
    options: ["Yes", "No"],
    condition: { who: "I'm a student" }
  },
  {
    id: "parent_phone_number",
    type: "text",
    question: "What's their phone number?",
    condition: {
      who: "I'm a student",
      wants_parent: "Yes"
    }
  }
];

function shouldShowStep(step: FlowStep, formData: FormData): boolean {
  if (!step.condition) return true;
  
  for (const [key, value] of Object.entries(step.condition)) {
    if (Array.isArray(value)) {
      // For multiselect conditions
      if (!formData[key as keyof FormData] || 
          !Array.isArray(formData[key as keyof FormData]) ||
          !value.some(v => (formData[key as keyof FormData] as string[])?.includes(v))) {
        return false;
      }
    } else {
      // For single value conditions
      if (formData[key as keyof FormData] !== value) {
        return false;
      }
    }
  }
  return true;
}

function getVisibleSteps(formData: FormData): FlowStep[] {
  return FLOW.filter(step => shouldShowStep(step, formData));
}

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const visibleSteps = getVisibleSteps(formData);
  const currentStep = visibleSteps[currentStepIndex];

  const handleInputChange = (value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [currentStep.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://mcat.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert("Your information has been submitted!");
      // You can redirect or reset formData if needed
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting. Please try again.");
    }
  };
  

  const isLastStep = currentStepIndex === visibleSteps.length - 1;
  const canProceed = formData[currentStep.id as keyof FormData] && 
    (Array.isArray(formData[currentStep.id as keyof FormData]) 
      ? (formData[currentStep.id as keyof FormData] as string[]).length > 0
      : true);

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-black hover:text-gray-600 transition-colors">
            <h1 className="text-8xl font-black tracking-tight mb-4">Textor</h1>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-black mb-6">{currentStep.question}</h2>

          {currentStep.type === "select" && currentStep.options && (
            <div className="space-y-3">
              {currentStep.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData[currentStep.id as keyof FormData] === option
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300 text-black"
                  } cursor-pointer`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === "text" && (
            <input
              type="text"
              value={formData[currentStep.id as keyof FormData] as string || ""}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
              placeholder="Type your answer..."
            />
          )}

          {currentStep.type === "multiselect" && currentStep.options && (
            <div className="space-y-3">
              {currentStep.options.map((option, index) => {
                const selectedValues = formData[currentStep.id as keyof FormData] as string[] || [];
                const isSelected = selectedValues.includes(option);
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const newValues = isSelected
                        ? selectedValues.filter(v => v !== option)
                        : [...selectedValues, option];
                      handleInputChange(newValues);
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-300 text-black"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                        isSelected ? "border-white" : "border-gray-300"
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded"></div>
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                currentStepIndex === 0
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Back
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg transition-all duration-200 ${
                  canProceed
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg transition-all duration-200 ${
                  canProceed
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 