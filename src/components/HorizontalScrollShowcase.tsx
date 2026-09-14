"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioProjects } from "@/lib/mock-portfolio";
import TiltCard from "@/components/TiltCard";

const featured = portfolioProjects.slice(0, 6);

export default function HorizontalScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxOffset(Math.max(0, trackWidth - viewportWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxOffset]);

  return (
    <section ref={sectionRef} className="relative bg-primary" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 sm:px-10">
          <h2 className="text-3xl font-bold text-text sm:text-4xl">
            Projetos em Destaque
          </h2>
          <p className="mt-2 text-text-secondary">
            Continue rolando a página para ver mais projetos
          </p>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex gap-6 px-6 sm:px-10"
        >
          {featured.map((project) => (
            <TiltCard
              key={project.slug}
              className="w-[280px] shrink-0 sm:w-[320px]"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="glass flex h-full flex-col rounded-lg p-5 transition-colors duration-fast hover:border-gold/60"
              >
                <div className="flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-text-secondary">
                  {project.category}
                </div>
                <p className="mt-4 font-bold text-text">{project.name}</p>
                <p className="mt-2 text-sm text-text-secondary">
                  {project.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-gold">
                  Ver Detalhes →
                </span>
              </Link>
            </TiltCard>
          ))}

          <TiltCard className="w-[280px] shrink-0 sm:w-[320px]">
            <Link
              href="/portfolio"
              className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-gold p-5 text-center transition-colors duration-fast hover:bg-gold/10"
            >
              <span className="text-lg font-bold text-gold">
                Ver Portfolio Completo
              </span>
              <span className="text-2xl text-gold">→</span>
            </Link>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
