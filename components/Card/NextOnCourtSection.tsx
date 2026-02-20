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
      <h3 className="text-lg font-bold px-1">Next On Court</h3>

      {matches.map((m, idx) => (
        <div
          key={idx}
          className="flex bg-neutral-100 rounded-2xl overflow-hidden"
        >
          <div className="bg-lime-400 text-black px-4 py-4 flex flex-col justify-center text-center font-bold text-sm">
            {m.date}
          </div>

          <div className="flex-1 p-4 space-y-1">
            <p className="font-semibold">{m.title}</p>
            <p className="text-xs text-neutral-500">{m.category}</p>

            <div className="flex gap-4 text-xs text-neutral-500 pt-2">
              <span>{m.time}</span>
              <span>{m.venue}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}