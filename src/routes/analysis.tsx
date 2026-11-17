import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/analysis")({
  head: () => ({ meta: [
    { title: "Historical analysis | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Explore sample year-wise, month-wise, seasonal, and daily rainfall visualizations for Bengaluru." },
    { property: "og:title", content: "Historical analysis | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "Interactive rainfall charts with illustrative sample values clearly distinguished from verified findings." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="analysis" />,
});