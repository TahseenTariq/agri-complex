import DetailsClient from "./DetailsClient";

// Generate static params for all possible IDs (1-10)
export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function SoilInstitutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id) || 1;
  const validId = (isNaN(numericId) || numericId < 1 || numericId > 10) ? 1 : numericId;
  return <DetailsClient id={validId} />;
}

