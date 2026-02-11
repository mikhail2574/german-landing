import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "B1 DTZ подготовка в Германии | Deutsch für Leben",
  description:
    "Отдельный лендинг B1-DTZ: для тех, у кого уже есть база и нужен структурный путь к экзамену и рабочей коммуникации.",
  openGraph: {
    title: "B1 DTZ подготовка в Германии",
    description: "Устная и письменная часть DTZ, тайминг, типовые задания, фокус на результате."
  }
};

const faq = [
  {
    q: "Кому подходит поток B1-DTZ?",
    a: "Тем, кто уже говорит на A2/B1-уровне и хочет сдать DTZ без хаотичной подготовки."
  },
  {
    q: "Что с письменной частью?",
    a: "Даем рабочие шаблоны, структуру письма и регулярные разборы ошибок."
  },
  {
    q: "Что с устной частью?",
    a: "Тренируем аргументацию, диалог и тайминг в формате, близком к экзамену."
  },
  {
    q: "Есть ли промежуточная диагностика?",
    a: "Да, на старте фиксируем уровень и даем персональный план по слабым зонам."
  }
];

export default function B1DtzLandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/50 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">B1 / DTZ</p>
        <h1 className="mt-3 text-4xl leading-tight text-slate-900 md:text-5xl">
          Подготовка к DTZ для тех, у кого уже есть база: структура, тайминг, результат
        </h1>
        <p className="mt-5 max-w-[70ch] text-slate-600">
          Этот лендинг для студентов с уровнем около A2-B1. Убираем хаос подготовки: отрабатываем формат экзамена,
          устную и письменную часть, плюс реальные сценарии Arbeit / Behörden / Briefe.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/#application" className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white">
            Записаться в B1-DTZ поток
          </Link>
          <Link href="/#contacts" className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-900">
            Уточнить уровень перед стартом
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Боли на этом этапе</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>знаю слова, но теряюсь на устной части</li>
            <li>не хватает структуры для письма</li>
            <li>страх не уложиться в тайминг</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Что даем в программе</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>структура ответа под критерии DTZ</li>
            <li>шаблоны и разборы письма B1</li>
            <li>тренировки с ограничением времени</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Формат</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>малые группы до 6 человек</li>
            <li>регулярные мини-тесты по формату DTZ</li>
            <li>обратная связь по каждому заданию</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
        <h2 className="text-2xl text-slate-900">FAQ по потоку B1-DTZ</h2>
        <div className="mt-5 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">{item.q}</summary>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
