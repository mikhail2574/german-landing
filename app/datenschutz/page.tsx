export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-3xl text-slate-900">Datenschutzerklärung</h1>
      <p className="mt-4 text-slate-600">
        Wir verarbeiten personenbezogene Daten nur, um auf Kursanfragen zu antworten, passende Gruppen
        vorzuschlagen und den Kontakt zur Anmeldung sicherzustellen.
      </p>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl text-slate-900">Welche Daten wir nutzen</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Kontaktdaten aus Formularen: E-Mail und/oder Telegram.</li>
          <li>Kurspräferenzen: Niveau, Format, Zeit, optional Stadt.</li>
          <li>Technische Ereignisse zur Messung von Leads (ohne sensible Inhalte).</li>
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl text-slate-900">Zweck und Speicherung</h2>
        <p className="mt-3 text-slate-700">
          Die Daten werden ausschließlich zur Bearbeitung der Anfrage und zur Kurszuordnung verwendet. Ohne
          weitere Zusammenarbeit löschen wir Anfragedaten regelmäßig nach angemessener Frist.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl text-slate-900">Kontakt zum Datenschutz</h2>
        <p className="mt-3 text-slate-700">E-Mail: info@deutschfuerleben.de</p>
        <p className="text-slate-700">Telegram: @deutschfuerleben</p>
      </section>
    </main>
  );
}
