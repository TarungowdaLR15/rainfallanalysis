import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/prediction")({
  head: () => ({ meta: [
    { title: "Simulated prediction | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Try a clearly labeled simulated rainfall estimate for a selected date and season." },
    { property: "og:title", content: "Simulated prediction | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "An interactive demonstration, not a real weather forecast or trained prediction model." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="prediction" />,
});