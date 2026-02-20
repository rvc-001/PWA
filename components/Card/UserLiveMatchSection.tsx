import LiveMatchCard from "@/components/Card/LiveMatchCard";

export default function UserLiveMatchSection() {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-bold px-1 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        Your Live Match
      </h3>

      <LiveMatchCard
        tournamentName="Bhopal Summer Open"
        matchTitle="Men's Doubles · Match #42"
        teamA={{ players: ["You", "S. Williams"] }}
        teamB={{ players: ["J. Brown", "K. Patel"] }}
        score={{ teamA: 11, teamB: 9, currentSet: 2 }}
        court="Sports Arena, Raipur"
        isLive
      />
    </section>
  );
}