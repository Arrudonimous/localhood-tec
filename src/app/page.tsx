import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import FeaturedPortfolio from "@/components/FeaturedPortfolio";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <FeaturedPortfolio />
      <Testimonials />
      <ContactForm />
    </>
  );
}
