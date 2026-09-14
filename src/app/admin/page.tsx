"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    leads: 0,
    testimonials: 0,
    posts: 0,
    projects: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/leads").then((r) => r.json()),
      fetch("/api/admin/testimonials").then((r) => r.json()),
      fetch("/api/admin/blog").then((r) => r.json()),
      fetch("/api/admin/projects").then((r) => r.json()),
    ]).then(([leads, testimonials, blog, projects]) => {
      setCounts({
        leads: leads.leads?.length ?? 0,
        testimonials: testimonials.testimonials?.length ?? 0,
        posts: blog.posts?.length ?? 0,
        projects: projects.projects?.length ?? 0,
      });
    });
  }, []);

  const stats = [
    { label: "Leads", value: counts.leads },
    { label: "Testimonials", value: counts.testimonials },
    { label: "Posts do Blog", value: counts.posts },
    { label: "Projetos", value: counts.projects },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        Dashboard Admin
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-secondary bg-secondary p-5"
          >
            <p className="text-xs text-text-secondary">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-text">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
