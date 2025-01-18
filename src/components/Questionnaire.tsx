import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const questions = [
  "How do you introduce yourself to new people?",
  "What kind of people do you like to talk to?",
  "How would you politely decline an offer you're not interested in?",
  "What's your favorite way to start a conversation?",
  "How do you respond to compliments?",
  "How do you handle disagreements in conversations?",
  "What topics do you enjoy discussing the most?",
  "How do you show empathy in conversations?",
  "What's your approach to small talk?",
  "How do you end conversations gracefully?",
  "What's your communication style in professional settings?",
  "How do you adapt your communication style with different people?",
  "What role do you usually take in group conversations?",
  "How do you handle silence in conversations?",
  "What makes you feel most comfortable in a conversation?",
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