"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale } from "@/hooks/useLocale";

const formSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  serviceType: z.enum([
    "website",
    "ecommerce",
    "system",
    "automation",
    "consulting",
    "other",
  ]),
  budget: z.enum(["b1", "b2", "b3", "b4", "b5"]),
  description: z.string().trim().min(10).max(500),
  acceptedPrivacy: z.literal(true),
  website: z.string().max(0).optional(), // honeypot anti-spam
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const descriptionLength = watch("description")?.length ?? 0;

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact-form", locale }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const services = [
    { value: "website", label: t("contact.services.website") },
    { value: "ecommerce", label: t("contact.services.ecommerce") },
    { value: "system", label: t("contact.services.system") },
    { value: "automation", label: t("contact.services.automation") },
    { value: "consulting", label: t("contact.services.consulting") },
    { value: "other", label: t("contact.services.other") },
  ];

  const budgets = [
    { value: "b1", label: t("contact.budgets.b1") },
    { value: "b2", label: t("contact.budgets.b2") },
    { value: "b3", label: t("contact.budgets.b3") },
    { value: "b4", label: t("contact.budgets.b4") },
    { value: "b5", label: t("contact.budgets.b5") },
  ];

  return (
    <section id="contato" className="bg-primary px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-lg">
        <h2 className="text-center text-3xl font-bold text-text sm:text-4xl">
          {t("contact.headline")}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass mt-10 rounded-lg border-gold/40 p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm text-text">{t("contact.name")} *</label>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-text">{t("contact.email")} *</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-text">{t("contact.phone")}</label>
              <input
                type="tel"
                {...register("phone")}
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-text">{t("contact.company")}</label>
              <input
                {...register("company")}
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-text">
                {t("contact.serviceType")} *
              </label>
              <select
                {...register("serviceType")}
                defaultValue=""
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  {t("contact.serviceTypePlaceholder")}
                </option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="mt-1 text-xs text-error">
                  {errors.serviceType.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-text">{t("contact.budget")} *</label>
              <select
                {...register("budget")}
                defaultValue=""
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  {t("contact.budgetPlaceholder")}
                </option>
                {budgets.map((budget) => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="mt-1 text-xs text-error">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-text">
                {t("contact.description")} *
              </label>
              <textarea
                rows={4}
                maxLength={500}
                {...register("description")}
                placeholder={t("contact.descriptionPlaceholder")}
                className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
              />
              <p className="mt-1 text-right text-xs text-text-secondary">
                {descriptionLength}/500
              </p>
              {errors.description && (
                <p className="mt-1 text-xs text-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Honeypot anti-spam: invisível para pessoas, bots costumam preencher */}
            <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div>
              <label className="flex items-start gap-2 text-xs text-text-secondary">
                <input
                  type="checkbox"
                  {...register("acceptedPrivacy")}
                  className="mt-0.5"
                />
                {t("contact.privacy")}
              </label>
              {errors.acceptedPrivacy && (
                <p className="mt-1 text-xs text-error">Required</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-green px-6 py-3 text-sm font-bold text-primary transition-colors duration-fast hover:bg-green-hover disabled:opacity-60"
            >
              {isSubmitting ? t("contact.submitting") : t("contact.submit")}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-green">
                {t("contact.success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-error">
                {t("contact.error")}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
