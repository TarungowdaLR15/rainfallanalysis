/** Illustrative chart samples are separate from the verified project findings below. */
export const projectStats = {
  observations: "3,653",
  rainyDays: "1,971",
  dryDays: "1,682",
  heavyDays: "3",
  rainyProbability: "53.96%",
  dryProbability: "46.04%",
};

export const months = [
  { month: "Jan", sample: 1.1 }, { month: "Feb", sample: 0.8 },
  { month: "Mar", sample: 1.9 }, { month: "Apr", sample: 3.4 },
  { month: "May", sample: 5.6 }, { month: "Jun", sample: 10.2 },
  { month: "Jul", sample: 12.1 }, { month: "Aug", sample: 11.4 },
  { month: "Sep", sample: 9.1 }, { month: "Oct", sample: 8.6 },
  { month: "Nov", sample: 4.5 }, { month: "Dec", sample: 1.8 },
];

export const years = [
  { year: "2016", sample: 1180 }, { year: "2017", sample: 1260 },
  { year: "2018", sample: 1115 }, { year: "2019", sample: 1385 },
  { year: "2020", sample: 1230 }, { year: "2021", sample: 1460 },
  { year: "2022", sample: 1325 }, { year: "2023", sample: 1540 },
  { year: "2024", sample: 1410 }, { year: "2025", sample: 1615 },
];

export const seasons = [
  { season: "Winter", sample: 0.54, verified: 0.5444 },
  { season: "Pre-monsoon", sample: 2.8 },
  { season: "SW monsoon", sample: 4.65, verified: 4.6524 },
  { season: "Post-monsoon", sample: 3.1 },
];

export const categories = [
  { name: "No Rain", value: 1682, fill: "var(--color-chart-1)" },
  { name: "Light Rain", value: 1234, fill: "var(--color-chart-2)" },
  { name: "Moderate Rain", value: 624, fill: "var(--color-chart-3)" },
  { name: "High Rain", value: 110, fill: "var(--color-chart-4)" },
  { name: "Heavy Rain", value: 3, fill: "var(--color-chart-5)" },
];

export const distribution = [
  { range: "0 mm", sample: 1682 }, { range: "0–2", sample: 690 },
  { range: "2–5", sample: 510 }, { range: "5–10", sample: 405 },
  { range: "10–20", sample: 240 }, { range: "20–50", sample: 123 },
  { range: ">50", sample: 3 },
];

export const scatterSample = Array.from({ length: 28 }, (_, index) => {
  const time = index * 130 + 18;
  const rainfall = Math.max(0, Math.round((Math.sin(index * 3.7) + 1) * 3 + (index % 7) * 0.72));
  return { time, rainfall, trend: 2.295889 + 0.00027027 * time };
});

export const hypothesisPeriods = [
  { period: "2016–2020", mean: "2.5636", variance: "26.4795", deviation: "5.1458", rainy: "938", heavy: "1" },
  { period: "2021–2025", mean: "3.0153", variance: "34.3208", deviation: "5.8584", rainy: "1,033", heavy: "2" },
];

export const hypothesisTests = {
  welchPValue: "0.013336",
  levenePValue: "0.015292",
  significanceLevel: "0.05",
};

export const regressionResults = {
  pearson: "0.051664",
  spearman: "0.080612",
  rSquared: "0.002669",
  slopePValue: "0.0017867",
  equation: "Rainfall_mm = 2.295889 + (0.00027027 × Time_days)",
};