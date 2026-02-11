export default function KontaktPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-3xl text-slate-900">Kontakt</h1>
      <p className="mt-4 text-slate-600">
        Office in Leipzig + online по всей Германии. Для подбора группы напишите в удобный канал.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">E-Mail</p>
          <a href="mailto:info@deutschfuerleben.de" className="mt-2 block font-medium text-slate-900">
            info@deutschfuerleben.de
          </a>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">Telegram</p>
          <a href="https://t.me/deutschfuerleben" className="mt-2 block font-medium text-slate-900">
            @deutschfuerleben
          </a>
        </article>
      </section>

      <section className="mt-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">Офис / формат</p>
        <p className="mt-2 font-medium text-slate-900">Leipzig (центр) · online по Германии</p>
      </section>

      <section className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">Время ответа</p>
        <p className="mt-2 font-semibold text-amber-950">Ответим в течение 24 часов, обычно быстрее</p>
      </section>
    </main>
  );
}
