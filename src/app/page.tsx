import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MentorSection from "@/components/MentorSection";
import EnrollmentForm from "@/components/EnrollmentForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MentorSection />
      <EnrollmentForm />
      <Footer />
    </div>
  );
}
