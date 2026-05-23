"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Input, Textarea, OptionButton, TagButton, ProgressBar } from "./FormInputs";
import { FaUser, FaLaptopCode, FaBullseye, FaCompass, FaClock, FaHandsHelping, FaLightbulb, FaCreditCard, FaChevronLeft, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import Button3D from "./Button3D";

const TECHNOLOGIES = ["HTML/CSS", "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "Flutter", "Swift", "Kotlin", "None"];
const WHY_REACT_NATIVE = ["Build cross-platform apps", "Career advancement", "Start a business/startup", "Personal project", "Freelancing opportunities"];
const LONG_TERM_GOALS = ["Become a mobile developer", "Build my own app/startup", "Freelance/consulting", "Add to existing skillset", "Career transition"];
const FOCUS_OPTIONS = [
  { value: "business", label: "Business-oriented", icon: "💼" },
  { value: "technical", label: "Technical/Programming", icon: "💻" },
  { value: "general", label: "General Skill Focus", icon: "🎯" },
  { value: "other", label: "Other Focus", icon: "✨" }
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
      case 2: return form.technicalBackground && form.technologiesUsed.length > 0 && form.hasBuiltApp;
      case 3: return form.expectations && form.whyReactNative && form.longTermGoal;
      case 4: return form.mentorshipFocus && (form.mentorshipFocus !== "other" || form.focusOther);
      case 5: return form.weeklyHours && form.learningStyle;
      case 6: return form.challenges && form.mentorNeeds;
      case 7: return form.hasAppIdea && (form.hasAppIdea !== "yes" || form.appIdeaDescription);
      case 8: return form.paymentMethod;
      default: return false;
    }
  };

  const stepTitles = ["Personal Info", "Background", "Goals & Intentions", "Preferred Focus", "Commitment & Style", "Student Needs", "App Idea (Optional)", "Payment Setup"];

  return (
    <section id="enroll" ref={ref} className="py-24 px-4 bg-dot-grid relative">
      {/* Decorative gradients */}
      <div className="absolute left-[20%] top-[30%] w-72 h-72 rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-[20%] bottom-[30%] w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Secure Your Mentorship Spot
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Take the first step to becoming a high-paid Web & Mobile full-stack developer under expert direction.
          </p>
        </div>

        {/* Multi-step Form Card */}
        <div className={`glass-card rounded-[2rem] border border-slate-800/80 overflow-hidden transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Glowing Top Progress Header */}
          <div className="bg-slate-950/80 px-8 py-6 border-b border-slate-900 flex flex-col gap-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step {step} of 8
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
                {stepTitles[step - 1]}
              </span>
            </div>
            <ProgressBar step={step} total={8} />
          </div>

          <div className="p-8 md:p-10">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center border border-teal-500/20">
                    <FaUser className="text-sm" />
                  </span>
                  Personal Details
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Please provide your authentic details. We coordinate primarily on Telegram.</p>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Full Name *" value={form.fullName} onChange={v => updateForm("fullName", v)} placeholder="Yohannes Damtie" />
                  <Input label="Email Address *" type="email" value={form.email} onChange={v => updateForm("email", v)} placeholder="yohannes@yotech.space" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Telegram Username *" value={form.telegramUsername} onChange={v => updateForm("telegramUsername", v)} placeholder="@yotech_support" />
                  <Input label="Phone Number (optional)" value={form.phoneNumber} onChange={v => updateForm("phoneNumber", v)} placeholder="+2519..." />
                </div>
              </div>
            )}

            {/* Step 2: Background */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                    <FaLaptopCode className="text-sm" />
                  </span>
                  Technical Background & Experience
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Technical Background *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Beginner", "Basic", "Intermediate", "Experienced"].map(level => (
                      <OptionButton key={level} selected={form.technicalBackground === level} onClick={() => updateForm("technicalBackground", level)} className="text-center justify-center py-4">
                        <span className="font-bold text-xs">{level}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Technologies Used Before *</label>
                  <div className="flex flex-wrap gap-2">
                    {TECHNOLOGIES.map(tech => (
                      <TagButton key={tech} selected={form.technologiesUsed.includes(tech)} onClick={() => toggleTech(tech)}>
                        {tech}
                      </TagButton>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Have you built an app before? *</label>
                  <div className="flex gap-3 max-w-xs">
                    {["Yes", "No"].map(opt => (
                      <OptionButton key={opt} selected={form.hasBuiltApp === opt.toLowerCase()} onClick={() => updateForm("hasBuiltApp", opt.toLowerCase())} className="flex-1 text-center justify-center py-4">
                        <span className="font-bold text-xs">{opt}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>

                {form.hasBuiltApp === "yes" && (
                  <div className="animate-fade-in">
                    <Textarea label="Describe your previous built apps *" value={form.appDescription} onChange={v => updateForm("appDescription", v)} placeholder="What did you build? Tech stack used? App link?" />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                    <FaBullseye className="text-sm" />
                  </span>
                  Your Goals & Expectations
                </h3>
                
                <Textarea label="What do you expect to achieve after this 6-month mentorship? *" value={form.expectations} onChange={v => updateForm("expectations", v)} placeholder="Explain in your own words what you expect..." />

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Why React Native? *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {WHY_REACT_NATIVE.map(reason => (
                      <OptionButton key={reason} selected={form.whyReactNative === reason} onClick={() => updateForm("whyReactNative", reason)}>
                        <span className="text-xs font-semibold">{reason}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Long-term Goal *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {LONG_TERM_GOALS.map(goal => (
                      <OptionButton key={goal} selected={form.longTermGoal === goal} onClick={() => updateForm("longTermGoal", goal)}>
                        <span className="text-xs font-semibold">{goal}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preferred Focus */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center border border-cyan-500/20">
                    <FaCompass className="text-sm" />
                  </span>
                  Preferred Mentorship Focus
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Customize your journey. Yohannes Damtie can tailor aspects of frontend/backend projects to match your path.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {FOCUS_OPTIONS.map(opt => (
                    <OptionButton key={opt.value} selected={form.mentorshipFocus === opt.value} onClick={() => updateForm("mentorshipFocus", opt.value)} className="flex flex-col items-center justify-center text-center p-6 gap-3">
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="font-bold text-sm">{opt.label}</span>
                    </OptionButton>
                  ))}
                </div>

                {form.mentorshipFocus === "other" && (
                  <div className="animate-fade-in mt-4">
                    <Input label="Please specify your specific focus *" value={form.focusOther} onChange={v => updateForm("focusOther", v)} placeholder="E.g., Cybersecurity focus, heavy database focus..." />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Commitment */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                    <FaClock className="text-sm" />
                  </span>
                  Commitment & Learning Style
                </h3>

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Weekly Hours Available *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {WEEKLY_HOURS.map(hours => (
                      <OptionButton key={hours} selected={form.weeklyHours === hours} onClick={() => updateForm("weeklyHours", hours)} className="text-center justify-center">
                        <span className="font-bold text-xs">{hours}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Preferred Learning Style *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {LEARNING_STYLES.map(style => (
                      <OptionButton key={style} selected={form.learningStyle === style} onClick={() => updateForm("learningStyle", style)}>
                        <span className="text-xs font-semibold">{style}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Needs */}
            {step === 6 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                    <FaHandsHelping className="text-sm" />
                  </span>
                  Student Needs & Challenges
                </h3>

                <Textarea label="What challenges have you faced in learning development? *" value={form.challenges} onChange={v => updateForm("challenges", v)} placeholder="No guidance? Tech is complex? Hard to deploy? Specify here..." />
                
                <Textarea label="What do you need most from your mentor Yohannes? *" value={form.mentorNeeds} onChange={v => updateForm("mentorNeeds", v)} placeholder="Weekly Zoom checkins? Instant code reviews? Deployment help?" />

                <Textarea label="Special Requirements or Accommodations (optional)" value={form.specialRequirements} onChange={v => updateForm("specialRequirements", v)} placeholder="Let us know if you need specific schedule planning..." />
              </div>
            )}

            {/* Step 7: App Idea */}
            {step === 7 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                    <FaLightbulb className="text-sm" />
                  </span>
                  App Idea (Optional)
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Do you have an app idea you would love to build, monetize, and launch on the Play Store during the 6 months mentorship?</p>
                
                <div className="space-y-3">
                  {[
                    { value: "yes", label: "Yes, I have an app idea I want to build", icon: "💡" },
                    { value: "no", label: "No, I'd prefer a mentor-assigned challenge", icon: "🤔" },
                    { value: "not-sure", label: "I am not sure yet, open to brainstorm", icon: "🌱" }
                  ].map(opt => (
                    <OptionButton key={opt.value} selected={form.hasAppIdea === opt.value} onClick={() => updateForm("hasAppIdea", opt.value)} className="w-full flex items-center gap-4 py-4">
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="font-bold text-xs md:text-sm">{opt.label}</span>
                    </OptionButton>
                  ))}
                </div>

                {form.hasAppIdea === "yes" && (
                  <div className="animate-fade-in mt-4">
                    <Textarea label="Describe your app idea *" value={form.appIdeaDescription} onChange={v => updateForm("appIdeaDescription", v)} placeholder="What does the app do? Who is the target audience?" />
                  </div>
                )}
              </div>
            )}

            {/* Step 8: Payment */}
            {step === 8 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2.5 mb-2">
                  <span className="w-9 h-9 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center border border-teal-500/20">
                    <FaCreditCard className="text-sm" />
                  </span>
                  Seat Security & Deposit Mode
                </h3>

                <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-500/15">
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Mentorship class is <strong className="text-teal-400">limited to exactly 15 seats</strong> to maintain premium support. A <strong className="text-teal-400">40% pre-deposit</strong> is mandatory to lock your slot.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase block">Select Payment Method *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map(method => (
                      <OptionButton key={method} selected={form.paymentMethod === method} onClick={() => updateForm("paymentMethod", method)} className="text-center justify-center py-4">
                        <span className="font-bold text-xs">{method}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Button Block */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-900/60">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(s => s - 1)} 
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 border border-slate-900/50 rounded-xl transition-all duration-300"
                >
                  <FaChevronLeft className="text-xs" />
                  Back
                </button>
              ) : <div />}

              {step < 8 ? (
                <Button3D
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="font-bold gap-2"
                >
                  Continue
                  <FaChevronRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </Button3D>
              ) : (
                <Button3D
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="font-black gap-2.5"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Securing Slot...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <FaPaperPlane className="text-xs group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button3D>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
