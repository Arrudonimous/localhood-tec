"use client";

import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTimeMinutes: number;
}

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  author: "Equipe Sterk",
  date: new Date().toISOString().slice(0, 10),
  readTimeMinutes: 5,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        content: form.content
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        readTimeMinutes: Number(form.readTimeMinutes),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Erro ao criar post");
      return;
    }

    setForm(emptyForm);
    load();
  };

  const remove = async (slug: string) => {
    await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">Blog</h1>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-3 rounded-lg border border-secondary bg-secondary p-6 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Slug (ex: meu-novo-post)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          required
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          required
          placeholder="Categoria"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <input
          placeholder="Tags (separadas por vírgula)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <textarea
          required
          placeholder="Resumo"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="sm:col-span-2 rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        <textarea
          required
          rows={5}
          placeholder="Conteúdo (um parágrafo por linha)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="sm:col-span-2 rounded-md border border-border bg-primary px-3 py-2 text-sm text-text"
        />
        {error && <p className="sm:col-span-2 text-sm text-error">{error}</p>}
        <button
          type="submit"
          className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary hover:bg-green-hover"
        >
          Publicar Post
        </button>
      </form>

      {loading ? (
        <p className="mt-6 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-start justify-between gap-4 rounded-md bg-secondary p-4"
            >
              <div>
                <p className="font-semibold text-text">{post.title}</p>
                <p className="text-xs text-text-secondary">
                  {post.category} · {post.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(post.slug)}
                className="shrink-0 text-xs text-error hover:underline"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
