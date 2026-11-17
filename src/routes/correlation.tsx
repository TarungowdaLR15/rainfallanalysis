import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/correlation")({
  head: () => ({ meta: [
    { title: "Correlation & regression | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Review rainfall correlation, supplied regression equation, and the model’s limited predictive power." },
    { property: "og:title", content: "Correlation & regression | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "A statistical view of time and rainfall, with illustrative points clearly identified." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="correlation" />,
});