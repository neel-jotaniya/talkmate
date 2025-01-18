import { useState } from "react";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Questionnaire } from "@/components/Questionnaire";
import { ChatInterface } from "@/components/ChatInterface";
import { PersonalInfo, OnboardingData } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [step, setStep] = useState<"personal" | "questionnaire" | "chat">("personal");
  const [userId, setUserId] = useState<string>("");
  const { toast } = useToast();

  const handlePersonalInfoComplete = async (personalInfo: PersonalInfo) => {
    setStep("questionnaire");
    window.sessionStorage.setItem("personalInfo", JSON.stringify(personalInfo));
  };

  const handleQuestionnaireComplete = async (answers: string[]) => {
    const personalInfo = JSON.parse(window.sessionStorage.getItem("personalInfo") || "{}");
    
    const onboardingData: OnboardingData = {
      personal_info: personalInfo,
      questionnaire_responses: answers,
    };

    try {
      const response = await fetch("/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      });

      const data = await response.json();
      setUserId(data.user_id);
      setStep("chat");
      toast({
        title: "Onboarding complete!",
        description: "You can now start chatting",
      });
    } catch (error) {
      toast({
        title: "Error completing onboarding",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {step === "personal" && (
          <div className="onboarding-card">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome! Let's get to know you</h1>
            <OnboardingForm onComplete={handlePersonalInfoComplete} />
          </div>
        )}

        {step === "questionnaire" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Help us understand your communication style</h1>
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        )}

        {step === "chat" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Start chatting!</h1>
            <ChatInterface userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;