import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCategories, blogPosts, type BlogCategoryKey } from "../../../data/blog-posts";

type CategoryPageProps = {
  params: { category: string };
};

function isCategory(value: string): value is BlogCategoryKey {
  return value in blogCategories;
}

export function generateStaticParams() {
  return Object.keys(blogCategories).map((category) => ({ category }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  if (!isCategory(params.category)) {
    return { title: "Категория не найдена" };
  }

  const category = blogCategories[params.category];
  return {
    title: `${category.label}: полезные статьи | Deutsch für Leben`,
    description: category.description
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (!isCategory(params.category)) {
    notFound();
  }

  const category = params.category;
  const categoryInfo = blogCategories[category];
  const posts = blogPosts.filter((post) => post.category === category);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Link href="/blog" className="text-sm font-semibold text-blue-800 underline underline-offset-2">
        &larr; К списку категорий
      </Link>

      <header className="mt-4 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Категория</p>
        <h1 className="mt-3 text-3xl text-slate-900 md:text-4xl">{categoryInfo.label}</h1>
        <p className="mt-3 text-slate-600">{categoryInfo.description}</p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <h2 className="text-xl text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <p className="mt-3 text-xs text-slate-500">{post.readTime}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-blue-800 underline underline-offset-2">
              Открыть статью
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
