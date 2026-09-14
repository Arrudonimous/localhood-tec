"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  result: string;
  featured: boolean;
}

const emptyForm = {
  name: "",
  company: "",
  role: "",
  message: "",
  rating: 5,
  result: "",
  featured: true,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data) => setItems(data.testimonials ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    load();
  };

  const toggleFeatured = async (item: Testimonial) => {
    await fetch(`/api/admin/testimonials/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !item.featured }),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        Testimonials
      </h1>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-3 rounded-lg border border-secondary bg-secondary p-6 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          required
          placeholder="Empresa"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          required
          placeholder="Cargo"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          required
          placeholder="Resultado (ex: Aumentou vendas em 200%)"
          value={form.result}
          onChange={(e) => setForm({ ...form, result: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <textarea
          required
          placeholder="Depoimento"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="sm:col-span-2 rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <select
          value={form.rating}
          onChange={(e) =>
            setForm({ ...form, rating: Number(e.target.value) })
          }
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} estrelas
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary hover:bg-green-hover"
        >
          Adicionar
        </button>
      </form>

      {loading ? (
        <p className="mt-6 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-md bg-secondary p-4"
            >
              <div>
                <p className="font-semibold text-text">
                  {item.name} · {item.company}
                </p>
                <p className="text-sm text-text-secondary">{item.message}</p>
                <p className="text-xs text-green">{item.result}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleFeatured(item)}
                  className={item.featured ? "text-gold" : "text-text-secondary"}
                >
                  {item.featured ? "Em destaque" : "Oculto"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="text-error hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
