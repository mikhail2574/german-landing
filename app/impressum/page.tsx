export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-3xl text-slate-900">Impressum</h1>
      <p className="mt-4 text-slate-600">
        Dies ist eine Platzhalterseite. Bitte ergänzen Sie vor Veröffentlichung die vollständigen
        rechtlichen Angaben gemäß deutschem Recht.
      </p>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="font-semibold text-slate-900">Anbieter</p>
        <p className="mt-2 text-slate-700">Deutsch für Leben (privater Sprachkurs)</p>
        <p className="text-slate-700">Leipzig, Deutschland</p>
        <p className="mt-2 text-slate-700">E-Mail: info@deutschfuerleben.de</p>
        <p className="text-slate-700">Telegram: @deutschfuerleben</p>
      </section>
    </main>
  );
}
