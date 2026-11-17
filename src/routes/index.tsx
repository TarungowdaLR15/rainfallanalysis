import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview | Bengaluru Rainfall Atlas" },
      { name: "description", content: "A decade of Bengaluru rainfall observations, probability, and seasonal insights at a glance." },
      { property: "og:title", content: "Overview | Bengaluru Rainfall Atlas" },
      { property: "og:description", content: "Explore verified Bengaluru rainfall statistics from 2016 to 2025." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <RainfallPage page="overview" />,
});