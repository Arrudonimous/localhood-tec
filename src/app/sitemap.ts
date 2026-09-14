import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-store";
import { portfolioProjects } from "@/lib/mock-portfolio";
import { siteConfig } from "@/config/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const staticRoutes = [
    "",
    "/portfolio",
    "/pricing",
    "/blog",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const portfolioRoutes = portfolioProjects.map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes];
}
