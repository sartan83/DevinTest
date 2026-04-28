"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProspectInput } from "@/lib/types";
import {
  Building2,
  Globe,
  Factory,
  MapPin,
  DollarSign,
  Users,
  Lightbulb,
  UserCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProspectFormProps {
  onSubmit: (input: ProspectInput) => void;
  isLoading: boolean;
}

export function ProspectForm({ onSubmit, isLoading }: ProspectFormProps) {
  const [showOptional, setShowOptional] = useState(false);
  const [form, setForm] = useState<ProspectInput>({
    companyName: "",
    websiteUrl: "",
    industry: "",
    country: "",
    revenue: "",
    employees: "",
    knownInitiatives: "",
    targetPersona: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!form.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website URL is required";
    } else {
      try {
        new URL(
          form.websiteUrl.startsWith("http")
            ? form.websiteUrl
            : `https://${form.websiteUrl}`,
        );
      } catch {
        newErrors.websiteUrl = "Please enter a valid URL";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const url = form.websiteUrl.startsWith("http")
      ? form.websiteUrl
      : `https://${form.websiteUrl}`;
    onSubmit({ ...form, websiteUrl: url });
  }

  function updateField(field: keyof ProspectInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Building2 className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <Input
            id="companyName"
            label="Company Name *"
            placeholder="e.g. Acme Corporation"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            error={errors.companyName}
            className="pl-11"
          />
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <Input
            id="websiteUrl"
            label="Company Website URL *"
            placeholder="e.g. https://acme.com"
            value={form.websiteUrl}
            onChange={(e) => updateField("websiteUrl", e.target.value)}
            error={errors.websiteUrl}
            className="pl-11"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowOptional(!showOptional)}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
      >
        {showOptional ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        {showOptional ? "Hide" : "Show"} optional fields
      </button>

      {showOptional && (
        <div className="space-y-4 border-t border-gray-100 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Factory className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                id="industry"
                label="Industry"
                placeholder="e.g. Financial Services"
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                className="pl-11"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                id="country"
                label="Country"
                placeholder="e.g. United States"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                id="revenue"
                label="Annual Revenue"
                placeholder="e.g. $5B"
                value={form.revenue}
                onChange={(e) => updateField("revenue", e.target.value)}
                className="pl-11"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              <Input
                id="employees"
                label="Number of Employees"
                placeholder="e.g. 50,000"
                value={form.employees}
                onChange={(e) => updateField("employees", e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          <div className="relative">
            <Lightbulb className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <Input
              id="knownInitiatives"
              label="Known Strategic Initiatives"
              placeholder="e.g. Cloud migration, AI adoption, legacy modernization"
              value={form.knownInitiatives}
              onChange={(e) => updateField("knownInitiatives", e.target.value)}
              className="pl-11"
            />
          </div>

          <div className="relative">
            <UserCircle className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <Input
              id="targetPersona"
              label="Target Persona"
              placeholder="e.g. CTO, VP of Engineering"
              value={form.targetPersona}
              onChange={(e) => updateField("targetPersona", e.target.value)}
              className="pl-11"
            />
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Generating microsite...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Prospect Microsite
          </span>
        )}
      </Button>

      <p className="text-xs text-center text-gray-400 leading-relaxed">
        This microsite is dynamically generated by an agent that researches the
        account, identifies strategic initiatives, checks for relevant public
        Cognition/Devin proof points, maps them to Devin use cases, and builds a
        tailored ROI hypothesis.
      </p>
    </form>
  );
}
