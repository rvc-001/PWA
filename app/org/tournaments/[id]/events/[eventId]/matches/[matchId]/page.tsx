import { redirect } from "next/navigation";

type Params = {
    id: string;
    eventId: string;
    matchId: string;
};

export default async function MatchRootPage({ params }: { params: Promise<Params> }) {
    const { id, eventId, matchId } = await params;
    redirect(`/org/tournaments/${id}/events/${eventId}/matches/${matchId}/setup`);
}
