import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/seasonal")({
  head: () => ({ meta: [
    { title: "Seasonal rainfall | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Compare verified Southwest Monsoon and Winter mean daily rainfall in Bengaluru." },
    { property: "og:title", content: "Seasonal rainfall | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "Seasonal rainfall analysis for Bengaluru with verified monsoon and winter findings." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="seasonal" />,
});