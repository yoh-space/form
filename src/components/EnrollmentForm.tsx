"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Input, Textarea, OptionButton, TagButton, ProgressBar } from "./FormInputs";

const TECHNOLOGIES = ["HTML/CSS", "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "Flutter", "Swift", "Kotlin", "None"];
const WHY_REACT_NATIVE = ["Build cross-platform apps", "Career advancement", "Start a business/startup", "Personal project", "Freelancing opportunities"];
const LONG_TERM_GOALS = ["Become a mobile developer", "Build my own app/startup", "Freelance/consulting", "Add to existing skillset", "Career transition"];
const FOCUS_OPTIONS = [
  { value: "business", label: "Business-oriented", icon: "💼" },
  { value: "technical", label: "Technical/Programming", icon: "💻" },
  { value: "general", label: "General Skill Focus", icon: "🎯" },
  { value: "other", label: "Other", icon: "✨" }
];
const WEEKLY_HOURS = ["5-10 hours", "10-15 hours", "15-20 hours", "20+ hours"];
const LEARNING_STYLES = ["Video tutorials", "Hands-on projects", "Reading documentation", "One-on-one mentoring", "Group sessions"];
const PAYMENT_METHODS = ["Bank Transfer", "Mobile Money", "PayPal", "Crypto", "Other"];

export default function EnrollmentForm() {
  const router = useRouter();
  const submitEnrollment = useMutation(api.enrollments.submit);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    fullName: "", email: "", telegramUsername: "", phoneNumber: "",
    technicalBackground: "", technologiesUsed: [] as string[], hasBuiltApp: "", appDescription: "",
    expectations: "", whyReactNative: "", longTermGoal: "",
    mentorshipFocus: "", focusOther: "",
    weeklyHours: "", learningStyle: "",
    challenges: "", mentorNeeds: "", specialRequirements: "",
    hasAppIdea: "", appIdeaDescription: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const updateForm = (field: string, value: string | string[]) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleTech = (tech: string) => setForm(prev => ({
    ...prev,
    technologiesUsed: prev.technologiesUsed.includes(tech)
      ? prev.technologiesUsed.filter(t => t !== tech)
      : [...prev.technologiesUsed, tech]
  }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitEnrollment({
        ...form,
        phoneNumber: form.phoneNumber || undefined,
        appDescription: form.appDescription || undefined,
        focusOther: form.focusOther || undefined,
        specialRequirements: form.specialRequirements || undefined,
        appIdeaDescription: form.appIdeaDescription || undefined,
      });
      router.push("/success");
    } catch {
      alert("Submission failed. Please try again.");
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return form.fullName && form.email && form.telegramUsername;
      case 2: return form.technicalBackground && form.technologiesUsed.length && form.hasBuiltApp;
      case 3: return form.expectations && form.whyReactNative && form.longTermGoal;
      case 4: return form.mentorshipFocus && (form.mentorshipFocus !== "other" || form.focusOther);
      case 5: return form.weeklyHours && form.learningStyle;
      case 6: return form.challenges && form.mentorNeeds;
      case 7: return form.hasAppIdea && (form.hasAppIdea !== "yes" || form.appIdeaDescription);
      case 8: return form.paymentMethod;
      default: return false;
    }
  };

  const stepTitles = ["Personal Info", "Background", "Goals", "Focus", "Commitment", "Needs", "App Idea", "Payment"];

  return (
    <section id="enroll" ref={ref} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Pre-Enrollment Form</h2>
          <p className="text-gray-600">Secure your spot in the next cohort</p>
        </div>

        <div className={`bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm opacity-80">Step {step} of 8</span>
              <span className="text-sm font-medium">{stepTitles[step - 1]}</span>
            </div>
            <ProgressBar step={step} total={8} />
          </div>

          <div className="p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">👤</span>
                  Personal Information
                </h3>
                <Input label="Full Name *" value={form.fullName} onChange={v => updateForm("fullName", v)} placeholder="Meseret Daniel" />
                <Input label="Email *" type="email" value={form.email} onChange={v => updateForm("email", v)} placeholder="youremail@gmail.com" />
                <Input label="Telegram Username *" value={form.telegramUsername} onChange={v => updateForm("telegramUsername", v)} placeholder="@username" />
                <Input label="Phone Number (optional)" value={form.phoneNumber} onChange={v => updateForm("phoneNumber", v)} placeholder="0911701858" />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">💻</span>
                  Background & Experience
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Technical Background *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Beginner", "Basic", "Intermediate", "Experienced"].map(level => (
                      <OptionButton key={level} selected={form.technicalBackground === level} onClick={() => updateForm("technicalBackground", level)}>
                        {level}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Technologies Used Before *</label>
                  <div className="flex flex-wrap gap-2">
                    {TECHNOLOGIES.map(tech => (
                      <TagButton key={tech} selected={form.technologiesUsed.includes(tech)} onClick={() => toggleTech(tech)}>
                        {tech}
                      </TagButton>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Have you built an app before? *</label>
                  <div className="flex gap-3">
                    {["Yes", "No"].map(opt => (
                      <OptionButton key={opt} selected={form.hasBuiltApp === opt.toLowerCase()} onClick={() => updateForm("hasBuiltApp", opt.toLowerCase())} className="flex-1 text-center">
                        {opt}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                {form.hasBuiltApp === "yes" && (
                  <Textarea label="Describe your app" value={form.appDescription} onChange={v => updateForm("appDescription", v)} placeholder="Brief description..." />
                )}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">🎯</span>
                  Goals & Intentions
                </h3>
                <Textarea label="What do you expect after the mentorship? *" value={form.expectations} onChange={v => updateForm("expectations", v)} placeholder="Describe your expectations..." />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Why do you want to learn React Native? *</label>
                  <div className="space-y-2">
                    {WHY_REACT_NATIVE.map(reason => (
                      <OptionButton key={reason} selected={form.whyReactNative === reason} onClick={() => updateForm("whyReactNative", reason)} className="w-full">
                        {reason}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Long-term Goal *</label>
                  <div className="space-y-2">
                    {LONG_TERM_GOALS.map(goal => (
                      <OptionButton key={goal} selected={form.longTermGoal === goal} onClick={() => updateForm("longTermGoal", goal)} className="w-full">
                        {goal}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">🔥</span>
                  Preferred Mentorship Focus
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {FOCUS_OPTIONS.map(opt => (
                    <OptionButton key={opt.value} selected={form.mentorshipFocus === opt.value} onClick={() => updateForm("mentorshipFocus", opt.value)} className="flex flex-col items-center py-6">
                      <span className="text-3xl mb-2">{opt.icon}</span>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
                {form.mentorshipFocus === "other" && (
                  <Input label="Please specify" value={form.focusOther} onChange={v => updateForm("focusOther", v)} />
                )}
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">⏰</span>
                  Commitment & Learning Style
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Weekly Hours Available *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {WEEKLY_HOURS.map(hours => (
                      <OptionButton key={hours} selected={form.weeklyHours === hours} onClick={() => updateForm("weeklyHours", hours)}>
                        {hours}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Learning Style *</label>
                  <div className="space-y-2">
                    {LEARNING_STYLES.map(style => (
                      <OptionButton key={style} selected={form.learningStyle === style} onClick={() => updateForm("learningStyle", style)} className="w-full">
                        {style}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">💡</span>
                  Student Needs & Expectations
                </h3>
                <Textarea label="What challenges have you faced in learning? *" value={form.challenges} onChange={v => updateForm("challenges", v)} placeholder="Describe any challenges..." />
                <Textarea label="What do you need most from your mentor? *" value={form.mentorNeeds} onChange={v => updateForm("mentorNeeds", v)} placeholder="What kind of support..." />
                <Textarea label="Special Requirements (optional)" value={form.specialRequirements} onChange={v => updateForm("specialRequirements", v)} placeholder="Any special requirements..." />
              </div>
            )}

            {/* Step 7 */}
            {step === 7 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">📱</span>
                  App Idea (Optional)
                </h3>
                <p className="text-gray-600 text-sm">Do you have an app idea you'd like to build during the mentorship?</p>
                <div className="space-y-3">
                  {[
                    { value: "yes", label: "Yes, I have an idea", icon: "💡" },
                    { value: "no", label: "No, not yet", icon: "🤔" },
                    { value: "not-sure", label: "I'm not sure yet", icon: "🌱" }
                  ].map(opt => (
                    <OptionButton key={opt.value} selected={form.hasAppIdea === opt.value} onClick={() => updateForm("hasAppIdea", opt.value)} className="w-full flex items-center gap-3">
                      <span className="text-2xl">{opt.icon}</span>
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
                {form.hasAppIdea === "yes" && (
                  <Textarea label="Describe your app idea" value={form.appIdeaDescription} onChange={v => updateForm("appIdeaDescription", v)} placeholder="Tell us about your app idea..." />
                )}
              </div>
            )}

            {/* Step 8 */}
            {step === 8 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-semibold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">💳</span>
                  Payment Confirmation
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-gray-700 text-sm">
                    A <span className="font-semibold text-blue-600">40% deposit</span> is required to secure your spot. How will you make the payment?
                  </p>
                </div>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(method => (
                    <OptionButton key={method} selected={form.paymentMethod === method} onClick={() => updateForm("paymentMethod", method)} className="w-full">
                      {method}
                    </OptionButton>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
              ) : <div />}
              
              {step < 8 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300 hover:-translate-y-0.5"
                >
                  Continue
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-medium hover:shadow-xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
