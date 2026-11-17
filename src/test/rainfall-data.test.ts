import { describe, expect, it } from "vitest";
import { hypothesisPeriods, hypothesisTests, projectStats, regressionResults, seasons } from "@/lib/rainfall-data";

describe("Bengaluru rainfall project findings", () => {
  it("preserves the reported ten-year observation totals", () => {
    expect(projectStats.observations).toBe("3,653");
    expect(Number(projectStats.rainyDays.replace(",", "")) + Number(projectStats.dryDays.replace(",", ""))).toBe(3653);
    expect(projectStats.heavyDays).toBe("3");
  });

  it("preserves the verified seasonal mean daily rainfall", () => {
    expect(seasons.find((season) => season.season === "SW monsoon")?.verified).toBe(4.6524);
    expect(seasons.find((season) => season.season === "Winter")?.verified).toBe(0.5444);
  });

  it("preserves period summary means, rainy days, and test comparison inputs", () => {
    expect(hypothesisPeriods.map(({ period, mean, rainy, heavy }) => ({ period, mean, rainy, heavy }))).toEqual([
      { period: "2016–2020", mean: "2.5636", rainy: "938", heavy: "1" },
      { period: "2021–2025", mean: "3.0153", rainy: "1,033", heavy: "2" },
    ]);
    expect(hypothesisTests).toEqual({ welchPValue: "0.013336", levenePValue: "0.015292", significanceLevel: "0.05" });
  });

  it("preserves the supplied correlation and regression results", () => {
    expect(regressionResults).toEqual({
      pearson: "0.051664",
      spearman: "0.080612",
      rSquared: "0.002669",
      slopePValue: "0.0017867",
      equation: "Rainfall_mm = 2.295889 + (0.00027027 × Time_days)",
    });
  });
});