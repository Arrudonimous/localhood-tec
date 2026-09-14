import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog-store";

export const metadata: Metadata = {
  title: "Blog — Sterk",
  description:
    "Artigos sobre e-commerce, design, automação e negócios digitais.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Blog</h1>
        <p className="mt-2 text-text-secondary">
          Conteúdo sobre e-commerce, design, automação e negócios digitais.
        </p>

        {blogPosts.length === 0 && (
          <p className="mt-10 text-text-secondary">
            Nenhum artigo publicado ainda.
          </p>
        )}

        <div className="mt-10 space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-secondary bg-secondary p-6 transition-colors duration-fast hover:border-gold"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                <span className="rounded-full bg-primary px-2 py-1 text-gold">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>· {post.readTimeMinutes} min de leitura</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-text">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-gold">
                Ler Mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
