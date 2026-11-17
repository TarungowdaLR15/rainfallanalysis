import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/hypothesis")({
  head: () => ({ meta: [
    { title: "Hypothesis testing | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Compare 2016–2020 and 2021–2025 rainfall statistics and significant test results." },
    { property: "og:title", content: "Hypothesis testing | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "Welch’s t-test and Levene’s test indicate significant differences between study periods." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="hypothesis" />,
});