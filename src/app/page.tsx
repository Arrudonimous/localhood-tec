import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import HorizontalScrollShowcase from "@/components/HorizontalScrollShowcase";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <HorizontalScrollShowcase />
      <Testimonials />
      <ContactForm />
    </>
  );
}
