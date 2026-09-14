import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/mock-blog";
import { portfolioProjects } from "@/lib/mock-portfolio";
import { siteConfig } from "@/config/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
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
