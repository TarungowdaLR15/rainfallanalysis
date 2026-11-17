import { createFileRoute } from "@tanstack/react-router";
import { RainfallPage } from "@/components/rainfall-pages";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About the project | Bengaluru Rainfall Atlas" },
    { name: "description", content: "Project introduction, dataset details, objectives, statistical methods, and conclusion." },
    { property: "og:title", content: "About the project | Bengaluru Rainfall Atlas" },
    { property: "og:description", content: "Learn about the 2016–2025 Bengaluru rainfall study and its statistical methods." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RainfallPage page="about" />,
});