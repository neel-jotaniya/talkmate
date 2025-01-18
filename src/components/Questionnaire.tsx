import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const questions = [
   "How do you usually introduce yourself to new people?",
    "What tone do you typically use in conversations?",
    "How do you prefer to address people in a professional setting?",
    "Do you tend to use emojis or special characters in your messages? If so, which ones are your favorite?",
    "What’s your favorite way to start a conversation?",
    "How do you engage in small talk, and what topics do you like to discuss?",
    "How do you keep a conversation flowing when someone gives a short response?",
    "How do you usually respond to compliments?",
    "If you’re not interested in an offer, how do you politely decline?",
    "What’s your preferred way of ending a conversation?",
    "Do you like to use humor in conversations? If yes, what kind of humor do you prefer?",
    "How often do you express emotions explicitly in your messages?",
    "What topics do you enjoy discussing the most?",
    "Are there any topics you usually avoid in conversations?",
    "When responding to a message, do you prefer keeping it concise or providing detailed answers?"
];

interface QuestionnaireProps {
  onComplete: (answers: string[]) => void;
}

export const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion]}</h3>
        <Textarea
          value={answers[currentQuestion]}
          onChange={(e) => {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = e.target.value;
            setAnswers(newAnswers);
          }}
          placeholder="Type your answer here..."
          className="min-h-[120px] mb-4"
        />
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion].trim()}
          className="w-full"
        >
          {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};
