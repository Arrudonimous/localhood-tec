import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-store";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post não encontrado — Sterk" };

  return {
    title: `${post.title} — Sterk`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="bg-primary px-6 py-16 sm:px-10">
      <article className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm text-gold hover:underline">
          ← Voltar para o Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
          <span className="rounded-full bg-secondary px-2 py-1 text-gold">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>· {post.readTimeMinutes} min de leitura</span>
          <span>· {post.author}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold text-text sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-4">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-12 border-t border-secondary pt-8">
            <h2 className="text-lg font-bold text-text">
              Artigos Relacionados
            </h2>
            <div className="mt-4 space-y-3">
              {related.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block text-sm text-gold hover:underline"
                >
                  {relatedPost.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
