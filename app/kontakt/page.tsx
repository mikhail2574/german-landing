export default function KontaktPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-3xl text-slate-900">Kontakt</h1>
      <p className="mt-4 text-slate-600">
        Для запиту щодо курсів напишіть у зручний канал. Відповідь:{" "}
        <span className="font-medium text-slate-900">Antwort innerhalb von 24 Stunden</span>.
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
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">Місто</p>
        <p className="mt-2 font-medium text-slate-900">Leipzig</p>
      </section>
    </main>
  );
}
