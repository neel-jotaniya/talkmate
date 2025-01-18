import { useState } from "react";
import { PersonalInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (data: PersonalInfo) => void;
}

export const OnboardingForm = ({ onComplete }: OnboardingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalInfo>({
    name: "",
    age: 0,
    sex: "",
    location: "",
    education: "",
    job_title: "",
    company_name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => !value)) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={formData.age || ""}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          placeholder="25"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="New York, USA"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          value={formData.education}
          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          placeholder="Bachelor's in Computer Science"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="job_title">Job Title</Label>
        <Input
          id="job_title"
          value={formData.job_title}
          onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
          placeholder="Software Engineer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          placeholder="Tech Corp"
        />
      </div>

      <Button type="submit" className="w-full">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};