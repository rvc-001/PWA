import { redirect } from "next/navigation";

type Params = {
  id: string;
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function UserTournamentEventsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const event = typeof query.event === "string" ? `?event=${encodeURIComponent(query.event)}` : "";
  redirect(`/tournaments/${id}/event${event}`);
}
