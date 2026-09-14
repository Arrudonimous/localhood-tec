"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials as fallbackTestimonials } from "@/lib/mock-testimonials";
import TiltCard from "@/components/TiltCard";

interface ApiTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  result: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>(
    fallbackTestimonials,
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data: { testimonials?: ApiTestimonial[] }) => {
        if (data.testimonials?.length) setTestimonials(data.testimonials);
      })
      .catch(() => {
        // mantém os depoimentos padrão em caso de falha
      });
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[index];

  return (
    <section className="bg-secondary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-text sm:text-4xl">
          O que nossos clientes dizem
        </h2>

        {!current ? (
          <p className="mt-10 text-text-secondary">
            Em breve, depoimentos dos nossos clientes.
          </p>
        ) : (
          <>
            <div className="relative mt-10 min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <TiltCard className="glass rounded-lg p-8">
                    <span className="text-4xl text-gold">&ldquo;</span>
                    <p className="mt-2 text-text">{current.message}</p>

                    <div className="mt-6 flex items-center justify-center gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < current.rating ? "★" : "☆"}</span>
                      ))}
                    </div>

                    <p className="mt-4 font-bold text-text">{current.name}</p>
                    <p className="text-sm text-text-secondary">
                      {current.role} · {current.company}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-green">
                      {current.result}
                    </p>
                  </TiltCard>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Depoimento anterior"
                className="text-xl text-text-secondary transition-colors duration-fast hover:text-gold"
              >
                ←
              </button>

              <div className="flex gap-2">
                {testimonials.map((testimonial, i) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    aria-label={`Ir para depoimento ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full transition-colors duration-fast ${
                      i === index ? "bg-gold" : "bg-text-secondary/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Próximo depoimento"
                className="text-xl text-text-secondary transition-colors duration-fast hover:text-gold"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
