import { redirect } from "next/navigation";

type Params = {
  id: string;
};

export default async function UserTournamentDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  redirect(`/tournaments/${id}`);
}
