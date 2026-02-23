type Match = {
  date: string;        // "Dec 18"
  title: string;
  category: string;
  time: string;
  venue: string;
};

export default function NextOnCourtSection() {
  const matches: Match[] = [
    {
      date: "Dec 18",
      title: "Regional Semi - Final",
      category: "Men's Open",
      time: "10:00 AM",
      venue: "City Court",
    },
    {
      date: "Dec 18",
      title: "Pickleball Quarter Final",
      category: "Singles",
      time: "10:00 AM",
      venue: "City Court",
    },
  ];

  return (
    <section className="space-y-3">
      <h3 className="text-lg font-bold px-1 text-[var(--color-text)]">Next On Court</h3>

      {matches.map((m, idx) => (
        <div
          key={idx}
          className="flex bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
        >
          <div className="bg-lime-400 dark:bg-lime-500 text-black px-4 py-4 flex flex-col justify-center text-center font-bold text-sm">
            {m.date}
          </div>

          <div className="flex-1 p-4 space-y-1">
            <p className="font-semibold text-[var(--color-text)]">{m.title}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{m.category}</p>

            <div className="flex gap-4 text-xs text-[var(--color-text-secondary)] pt-2">
              <span>{m.time}</span>
              <span>{m.venue}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
