import { getMicrosite } from "@/lib/microsite-store";
import { notFound } from "next/navigation";
import { MicrositeView } from "@/components/microsite/MicrositeView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MicrositePage({ params }: Props) {
  const { id } = await params;

  if (!/^[a-f0-9]{16}$/.test(id)) {
    notFound();
  }

  const data = await getMicrosite(id);
  if (!data) {
    notFound();
  }

  return <MicrositeView data={data} />;
}
