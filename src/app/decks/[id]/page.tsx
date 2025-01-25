export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>The id is {id}</div>;
}
