import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCategories, blogPosts, getBlogPostBySlug } from "../../data/blog-posts";

type PostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Статья не найдена"
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription
    }
  };
}

function MidCta() {
  return (
    <aside className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <p className="text-sm font-semibold text-blue-900">Нужен персональный маршрут от A1 до B1?</p>
      <p className="mt-1 text-sm text-slate-700">Запишитесь на консультацию и получите рекомендацию по уровню и группе.</p>
      <Link href="/#application" className="mt-3 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
        Оставить заявку
      </Link>
    </aside>
  );
}

function EndCta() {
  return (
    <aside className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-sm font-semibold text-amber-900">Хотите больше практики по Jobcenter, Arzt, Arbeit и DTZ?</p>
      <p className="mt-1 text-sm text-slate-700">Скачайте бесплатный чеклист и переходите к ближайшей группе.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href="/#checklist" className="inline-flex rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900">
          Получить чеклист
        </Link>
        <Link href="/#application" className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-amber-950">
          Записаться в группу
        </Link>
      </div>
    </aside>
  );
}

export default function BlogPostPage({ params }: PostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const middleIndex = Math.ceil(post.sections.length / 2);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Link href="/blog" className="text-sm font-semibold text-blue-800 underline underline-offset-2">
        &larr; Назад к блогу
      </Link>

      <article className="mt-4 rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/55 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-700">{blogCategories[post.category].label}</p>
        <h1 className="mt-3 text-3xl leading-tight text-slate-900 md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-slate-600">{post.excerpt}</p>
        <p className="mt-3 text-xs text-slate-500">{post.readTime}</p>

        <nav className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4" aria-label="Оглавление">
          <p className="text-sm font-semibold text-slate-900">Оглавление</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-blue-900">
            {post.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="underline underline-offset-2">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 space-y-8">
          {post.sections.map((section, index) => (
            <section id={section.id} key={section.id} className="scroll-mt-28">
              <h2 className="text-2xl text-slate-900">{section.title}</h2>
              <p className="mt-3 text-slate-700">{section.content}</p>
              {index + 1 === middleIndex ? <MidCta /> : null}
            </section>
          ))}
        </div>

        <EndCta />
      </article>
    </main>
  );
}
