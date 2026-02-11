import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A1 немецкий с нуля в Германии | Deutsch für Leben",
  description:
    "Лендинг для новичков: немецкий A1 для жизни в Германии. Alltag, Arzt, Jobcenter, Telefon, Briefe и первая работа.",
  openGraph: {
    title: "A1 немецкий с нуля в Германии",
    description: "Практический курс для новичков-мигрантов: старт A1, малые группы, живые сценарии."
  }
};

const faq = [
  {
    q: "Подходит ли, если совсем с нуля?",
    a: "Да, программа рассчитана на старт без базы и без школьной грамматики в голове."
  },
  {
    q: "Сколько времени нужно вне уроков?",
    a: "Обычно 20-40 минут в день на короткую практику и повтор фраз."
  },
  {
    q: "Какие темы пройдем в первые недели?",
    a: "Alltag, телефон, запись к врачу, простые формы, базовые письма и общение в городе."
  },
  {
    q: "Когда ближайший старт?",
    a: "Ближайший старт A1 - 21.02. Места в потоке ограничены."
  }
];

export default function A1LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <section className="rounded-3xl border border-blue-100 bg-white p-7 shadow-lg shadow-blue-100/50 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">A1 для новичков</p>
        <h1 className="mt-3 text-4xl leading-tight text-slate-900 md:text-5xl">
          Немецкий с нуля для жизни в Германии: без стресса и перегруза
        </h1>
        <p className="mt-5 max-w-[70ch] text-slate-600">
          Если страшно говорить в Alltag, сложно звонить и разбираться в письмах, этот поток закрывает базу для реальной
          жизни: Arzt, Jobcenter, Telefon, Briefe, работа и бытовые ситуации.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/#application" className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white">
            Записаться в A1-группу
          </Link>
          <Link href="/#checklist" className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-900">
            Получить чеклист
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Боли, с которыми приходят</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>страх телефонных звонков</li>
            <li>непонятные письма от ведомств</li>
            <li>сложно объяснить простую бытовую ситуацию</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Что вы получите</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>рабочие фразы под Alltag и Behörden</li>
            <li>шаблоны для писем и звонков</li>
            <li>уверенность в базовых диалогах</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-xl text-slate-900">Как учимся</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>малые группы до 6 человек</li>
            <li>уроки по 90 минут с практикой</li>
            <li>обратная связь после каждого занятия</li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
        <h2 className="text-2xl text-slate-900">FAQ по потоку A1</h2>
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
