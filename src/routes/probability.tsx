import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/probability")({
  head: () => ({ meta: [
    { title: "Probability analysis | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Verified rainy-day, dry-day, and heavy-rain probabilities from the Bengaluru rainfall study." },
    { property: "og:title", content: "Probability analysis | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "Rainy and no-rain day counts and rainfall category analysis across 3,653 days." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="probability" />,
});