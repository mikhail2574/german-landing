import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, blogPosts } from "../data/blog-posts";

export const metadata: Metadata = {
  title: "Блог Deutsch für Leben: Jobcenter, Arzt, DTZ, Alltag",
  description:
    "Полезные статьи по немецкому в Германии: Jobcenter, Arzt, DTZ, Alltag, Arbeit, Briefe. Практические сценарии и шаблоны.",
  openGraph: {
    title: "Блог Deutsch für Leben",
    description:
      "Практический блог по немецкому для жизни, работы и интеграции в Германии.",
    type: "website"
  }
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <header className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/55 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Блог / полезное</p>
        <h1 className="mt-3 text-4xl leading-tight text-slate-900 md:text-5xl">Практический немецкий для жизни в Германии</h1>
        <p className="mt-4 max-w-[68ch] text-slate-600">
          Категории и шаблоны статей для SEO-роста: Jobcenter, Arzt, DTZ, Alltag, Arbeit, Briefe. В каждой статье есть
          структура, оглавление и CTA к заявке.
        </p>
      </header>

      <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl text-slate-900">Категории</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {Object.entries(blogCategories).map(([key, value]) => (
            <Link
              key={key}
              href={`/blog/category/${key}`}
              className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 transition hover:-translate-y-0.5 hover:bg-blue-100/70"
            >
              <p className="font-semibold text-slate-900">{value.label}</p>
              <p className="mt-1 text-sm text-slate-600">{value.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl text-slate-900">Статьи</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{blogCategories[post.category].label}</p>
              <h3 className="mt-2 text-xl text-slate-900">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <p className="mt-3 text-xs text-slate-500">{post.readTime}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-blue-800 underline underline-offset-2">
                Читать статью
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
