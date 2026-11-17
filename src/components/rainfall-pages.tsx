import {
  Activity, ArrowDownRight, ArrowUpRight, Cloud, CloudDrizzle, CloudRain, Droplets,
  FlaskConical, Info, MapPin, ShieldCheck, Sun, Wind,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart,
  Pie, PieChart, ReferenceLine, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, distribution, hypothesisPeriods, hypothesisTests, months, projectStats, regressionResults, scatterSample, seasons, years } from "@/lib/rainfall-data";

type PageKey = "overview" | "analysis" | "probability" | "seasonal" | "hypothesis" | "correlation" | "prediction" | "about";

const chartTooltipStyle = { border: "1px solid var(--border)", borderRadius: "5px", background: "var(--popover)", color: "var(--popover-foreground)", fontSize: "12px" };
const numericTooltip = (value: number | string, name: string) => [typeof value === "number" ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value, name];

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function SectionHeading({ title, detail, trailing }: { title: string; detail?: string | undefined; trailing?: ReactNode | undefined }) {
  return <div className="section-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{trailing}</div>;
}

function ChartPanel({ title, detail, children, className = "" }: { title: string; detail?: string; children: ReactNode; className?: string }) {
  return <section className={`chart-panel ${className}`}><SectionHeading title={title} detail={detail} />{children}</section>;
}

function SampleNote({ children = "Illustrative chart sample · not verified daily observations" }: { children?: string }) {
  return <span className="sample-note"><Info size={13} />{children}</span>;
}

function Kpi({ label, value, unit, icon: Icon, variant = "blue", trend }: { label: string; value: string; unit?: string; icon: typeof Droplets; variant?: string; trend?: string }) {
  return <article className="kpi-item"><div className="kpi-top"><span>{label}</span><span className={`kpi-icon kpi-${variant}`}><Icon size={17} strokeWidth={1.9} /></span></div><div className="kpi-value">{value}<span>{unit}</span></div><div className="kpi-foot">{trend ? <><ArrowUpRight size={13} />{trend}</> : "2016–2025 project result"}</div></article>;
}

function ChartLegend({ labels }: { labels: string[] }) {
  return <div className="chart-legend">{labels.map((label, index) => <span key={label}><i className={`legend-dot legend-${index}`} />{label}</span>)}</div>;
}

function Overview() {
  return <>
    <PageHeading eyebrow="CITY CLIMATE INTELLIGENCE · 01" title="Rainfall, in perspective." description="A ten-year statistical look at daily rainfall patterns across Bengaluru." action={<div className="location-chip"><MapPin size={15} /> Bengaluru, Karnataka</div>} />
    <div className="welcome-band"><div className="welcome-icon"><CloudRain size={22} /></div><div><span className="welcome-kicker">PROJECT OVERVIEW</span><h2>Statistical Analysis & Prediction of Rainfall Patterns</h2><p>Exploring a decade of daily rainfall data, from seasonal behavior to statistical significance.</p></div><div className="welcome-years">2016<span>—</span>2025</div></div>
    <div className="kpi-grid">
      <Kpi label="Total observations" value={projectStats.observations} icon={Activity} variant="blue" />
      <Kpi label="Rainy days" value={projectStats.rainyDays} icon={CloudRain} variant="teal" trend="53.96% of days" />
      <Kpi label="No-rain days" value={projectStats.dryDays} icon={Sun} variant="gold" trend="46.04% of days" />
      <Kpi label="Heavy rainfall days" value={projectStats.heavyDays} unit=" >50 mm" icon={Droplets} variant="coral" />
    </div>
    <div className="analytics-grid overview-charts">
      <ChartPanel title="Year-wise rainfall" detail="A decade at a glance" className="span-two">
        <SampleNote />
        <div className="chart-area chart-tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={years} margin={{ top: 15, right: 12, left: -18, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickMargin={12} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={numericTooltip} labelStyle={{ color: "var(--foreground)" }} /><Bar dataKey="sample" name="Sample total (mm)" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} maxBarSize={32} /></BarChart></ResponsiveContainer></div>
      </ChartPanel>
      <ChartPanel title="Rainfall probability" detail="Across 3,653 daily observations">
        <div className="probability-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: "Rainy", value: 1971, fill: "var(--color-chart-2)" }, { name: "No rain", value: 1682, fill: "var(--color-chart-1)" }]} dataKey="value" nameKey="name" innerRadius="65%" outerRadius="88%" paddingAngle={3} stroke="none">{[0, 1].map((value) => <Cell key={value} fill={value === 0 ? "var(--color-chart-2)" : "var(--color-chart-1)"} />)}</Pie><Tooltip contentStyle={chartTooltipStyle} formatter={(value, name) => [`${Number(value).toLocaleString()} days`, name]} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>53.96%</strong><span>rainy days</span></div></div>
        <ChartLegend labels={["Rainy · 1,971", "No rain · 1,682"]} />
      </ChartPanel>
      <ChartPanel title="Seasonal mean rainfall" detail="Average daily rainfall by season">
        <SampleNote>Verified values highlighted · other bars illustrative</SampleNote>
        <div className="chart-area chart-medium"><ResponsiveContainer width="100%" height="100%"><BarChart data={seasons} margin={{ top: 16, right: 8, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="season" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickMargin={9} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`${Number(v).toFixed(2)} mm`, "Illustrative mean"]} /><Bar dataKey="sample" fill="var(--color-chart-3)" radius={[3, 3, 0, 0]} maxBarSize={37} /></BarChart></ResponsiveContainer></div>
      </ChartPanel>
    </div>
    <div className="insight-strip"><div className="insight-emblem"><CloudRain size={19} /></div><div><strong>Southwest monsoon leads the seasonal pattern</strong><span>Verified mean daily rainfall is 4.6524 mm during the Southwest Monsoon, versus 0.5444 mm in Winter.</span></div><Button variant="outline" size="sm" asChild><a href="/seasonal">Explore seasons <ArrowUpRight size={14} /></a></Button></div>
  </>;
}

function AnalysisPage() {
  return <>
    <PageHeading eyebrow="HISTORICAL ANALYSIS · 02" title="Explore the rainfall record." description="Yearly, monthly, seasonal, and daily distributions across the study period." />
    <div className="analytics-grid">
      <ChartPanel title="Year-wise rainfall analysis" detail="Annual totals · illustrative sample" className="span-two"><SampleNote /><div className="chart-area chart-tall"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={years} margin={{ top: 15, right: 12, left: -18 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={numericTooltip} /><Bar dataKey="sample" name="Sample rainfall (mm)" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} maxBarSize={32} /><Line dataKey="sample" name="Trend" stroke="var(--color-chart-5)" dot={false} strokeWidth={2} /></ComposedChart></ResponsiveContainer></div></ChartPanel>
      <ChartPanel title="Month-wise distribution" detail="Illustrative average daily rainfall"><SampleNote /><div className="chart-area chart-tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={months} margin={{ top: 15, right: 8, left: -20 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`${v} mm`, "Sample daily average"]} /><Bar dataKey="sample" name="Sample average (mm)" fill="var(--color-chart-3)" radius={[3, 3, 0, 0]} maxBarSize={24} /></BarChart></ResponsiveContainer></div></ChartPanel>
      <ChartPanel title="Seasonal pattern" detail="Verified seasonal means shown where supplied"><SampleNote /><div className="chart-area chart-medium"><ResponsiveContainer width="100%" height="100%"><BarChart data={seasons} margin={{ top: 15, right: 8, left: -18 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="season" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`${Number(v).toFixed(2)} mm`, "Sample mean daily rainfall"]} /><Bar dataKey="sample" fill="var(--color-chart-4)" radius={[3, 3, 0, 0]} maxBarSize={40} /></BarChart></ResponsiveContainer></div></ChartPanel>
      <ChartPanel title="Rainfall category distribution" detail="Category counts unavailable · chart uses illustrative counts"><SampleNote /><div className="chart-area chart-medium"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categories} dataKey="value" nameKey="name" innerRadius="49%" outerRadius="78%" paddingAngle={2} stroke="none">{categories.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Pie><Tooltip contentStyle={chartTooltipStyle} formatter={numericTooltip} /></PieChart></ResponsiveContainer></div><ChartLegend labels={categories.map((item) => item.name)} /></ChartPanel>
      <ChartPanel title="Daily rainfall distribution" detail="Observation frequency by rainfall interval · sample"><SampleNote /><div className="chart-area chart-medium"><ResponsiveContainer width="100%" height="100%"><BarChart data={distribution} margin={{ top: 15, right: 8, left: -20 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="range" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} /><Tooltip contentStyle={chartTooltipStyle} formatter={numericTooltip} /><Bar dataKey="sample" name="Illustrative days" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} maxBarSize={35} /></BarChart></ResponsiveContainer></div></ChartPanel>
    </div>
  </>;
}

function ProbabilityPage() {
  return <>
    <PageHeading eyebrow="PROBABILITY · 03" title="The odds of rain." description="Observed frequency of rainy, dry, and heavy-rain days in the ten-year study." />
    <div className="kpi-grid three-kpis"><Kpi label="Rainy days" value="1,971" unit="53.9557%" icon={CloudRain} variant="teal" /><Kpi label="No-rain days" value="1,682" unit="46.0443%" icon={Sun} variant="gold" /><Kpi label="Heavy rainfall days" value="3" unit="0.0821%" icon={Droplets} variant="coral" /></div>
    <div className="analytics-grid">
      <ChartPanel title="Rainy versus non-rainy days" detail="Verified observation counts · 3,653 total days"><div className="probability-large"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: "Rainy days", value: 1971 }, { name: "No-rain days", value: 1682 }]} dataKey="value" nameKey="name" innerRadius="63%" outerRadius="86%" paddingAngle={3} stroke="none">{["var(--color-chart-2)", "var(--color-chart-1)"].map((fill) => <Cell key={fill} fill={fill} />)}</Pie><Tooltip contentStyle={chartTooltipStyle} formatter={(v, name) => [`${Number(v).toLocaleString()} days`, name]} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>3,653</strong><span>observations</span></div></div><ChartLegend labels={["Rainy · 1,971 (53.9557%)", "No rain · 1,682 (46.0443%)"]} /></ChartPanel>
      <ChartPanel title="Rainfall intensity categories" detail="Categories are provided; individual counts were not specified"><div className="category-list">{categories.map((item) => <div className="category-row" key={item.name}><i style={{ background: item.fill }} /><span>{item.name}</span><span className="category-count">{item.name === "No Rain" ? "1,682" : item.name === "Heavy Rain" ? "3" : "—"}</span></div>)}</div><div className="notice-inline"><Info size={15} /><span>Only no-rain and heavy-rain counts were supplied. Intermediate category counts are not represented as verified results.</span></div></ChartPanel>
    </div>
    <div className="insight-strip"><div className="insight-emblem"><Droplets size={18} /></div><div><strong>Rain occurs on 53.9557% of observed days</strong><span>Heavy rainfall above 50 mm was recorded on 3 days, or 0.0821% of the study.</span></div></div>
  </>;
}

function SeasonalPage() {
  return <>
    <PageHeading eyebrow="SEASONAL ANALYSIS · 04" title="Four seasons, one city." description="Compare daily rainfall patterns through the Bengaluru year." />
    <div className="season-highlight-grid"><article className="season-highlight"><div className="season-mark monsoon-mark"><CloudRain size={19} /></div><span className="season-caption">SOUTHWEST MONSOON</span><strong>4.6524 <small>mm/day</small></strong><span className="season-foot">Verified mean daily rainfall</span></article><article className="season-highlight"><div className="season-mark winter-mark"><Sun size={19} /></div><span className="season-caption">WINTER</span><strong>0.5444 <small>mm/day</small></strong><span className="season-foot">Verified mean daily rainfall</span></article><article className="season-highlight season-summary"><span className="season-caption">MONSOON / WINTER RATIO</span><strong>8.55×</strong><span className="season-foot">Mean daily rainfall difference</span></article></div>
    <ChartPanel title="Average daily rainfall by season" detail="Verified means for Southwest Monsoon and Winter; remaining bars are illustrative"><div className="sample-row"><SampleNote>Other seasonal chart values are illustrative samples</SampleNote></div><div className="chart-area chart-wide"><ResponsiveContainer width="100%" height="100%"><BarChart data={seasons} margin={{ top: 20, right: 20, left: -12, bottom: 5 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" /><XAxis dataKey="season" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickMargin={12} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} label={{ value: "Mean daily rainfall (mm)", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)", fontSize: 11 }} /><Tooltip contentStyle={chartTooltipStyle} formatter={(v) => [`${Number(v).toFixed(4)} mm`, "Mean daily rainfall"]} /><Bar dataKey="sample" name="Sample seasonal mean" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} maxBarSize={68} /></BarChart></ResponsiveContainer></div></ChartPanel>
    <div className="notice-inline notice-wide"><Info size={15} /><span>Only Southwest Monsoon and Winter daily mean values are supplied as verified findings. Chart values for Pre-monsoon and Post-monsoon are illustrative and should not be used as study results.</span></div>
  </>;
}

function HypothesisPage() {
  return <>
    <PageHeading eyebrow="HYPOTHESIS TESTING · 05" title="Did rainfall patterns shift?" description="Compare summary statistics across the first and second halves of the study." />
    <div className="period-grid">{hypothesisPeriods.map((period, index) => <article className="period-panel" key={period.period}><div className="period-title"><span className={`period-marker period-${index}`} /><h2>{period.period}</h2><span>{index === 0 ? "FIRST PERIOD" : "SECOND PERIOD"}</span></div><div className="period-stat-grid"><div><span>Mean rainfall</span><strong>{period.mean}<small>mm</small></strong></div><div><span>Variance</span><strong>{period.variance}</strong></div><div><span>Standard deviation</span><strong>{period.deviation}<small>mm</small></strong></div><div><span>Rainy days</span><strong>{period.rainy}</strong></div><div><span>Heavy rainfall days</span><strong>{period.heavy}</strong></div></div></article>)}</div>
    <section className="chart-panel test-panel"><SectionHeading title="Statistical test results" detail={`Both tests are significant at α = ${hypothesisTests.significanceLevel}`} /><div className="test-grid"><article><div className="test-label"><FlaskConical size={16} /> Welch’s t-test</div><strong>{hypothesisTests.welchPValue}</strong><span className="test-result"><ArrowDownRight size={13} />p &lt; 0.05 · significant</span></article><article><div className="test-label"><Activity size={16} /> Levene’s test</div><strong>{hypothesisTests.levenePValue}</strong><span className="test-result"><ArrowDownRight size={13} />p &lt; 0.05 · significant</span></article><article className="alpha-box"><span>Significance level</span><strong>α = {hypothesisTests.significanceLevel}</strong><small>Decision threshold</small></article></div><div className="test-conclusion"><ShieldCheck size={18} /><div><strong>Statistically significant differences between periods</strong><span>Both reported p-values are below the 0.05 significance threshold.</span></div></div></section>
  </>;
}

function CorrelationPage() {
  return <>
    <PageHeading eyebrow="CORRELATION & REGRESSION · 06" title="Time is a weak signal." description="Assess the relationship between time and daily rainfall using the supplied statistical results." />
    <div className="correlation-kpis"><article><span>Pearson correlation</span><strong>{regressionResults.pearson}</strong><small>Linear association</small></article><article><span>Spearman correlation</span><strong>{regressionResults.spearman}</strong><small>Rank association</small></article><article><span>R-squared</span><strong>{regressionResults.rSquared}</strong><small>Variance explained</small></article><article><span>Slope p-value</span><strong>{regressionResults.slopePValue}</strong><small>Statistical significance</small></article></div>
    <ChartPanel title="Daily rainfall & regression line" detail="Scatter points and fitted line are illustrative · model equation is supplied"><SampleNote>Scatter points are illustrative · not the original observations</SampleNote><div className="chart-area chart-wide"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={scatterSample} margin={{ top: 22, right: 20, left: -8, bottom: 5 }}><CartesianGrid stroke="var(--border)" strokeDasharray="3 5" /><XAxis type="number" dataKey="time" name="Time" domain={[0, 3700]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} label={{ value: "Time (study days)", position: "insideBottom", offset: -2, fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis type="number" dataKey="rainfall" name="Rainfall" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)", fontSize: 11 }} /><Tooltip contentStyle={chartTooltipStyle} formatter={(v, n) => [`${Number(v).toFixed(2)} mm`, n]} /><Scatter data={scatterSample} dataKey="rainfall" name="Sample rainfall" fill="var(--color-chart-2)" fillOpacity={0.64} /><Line dataKey="trend" name="Regression line" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} legendType="line" /></ComposedChart></ResponsiveContainer></div><div className="equation-band"><span>REGRESSION EQUATION</span><code>{regressionResults.equation}</code></div></ChartPanel>
    <div className="insight-strip"><div className="insight-emblem"><Activity size={18} /></div><div><strong>Very weak relationship · limited predictive power</strong><span>Correlation is close to zero and R² is 0.002669. This simple regression is not a reliable weather forecast.</span></div></div>
  </>;
}

function PredictionPage() {
  const [prediction, setPrediction] = useState<{ amount: number; category: string; condition: string; icon: "sun" | "drizzle" | "rain" } | null>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const month = Number(form.get("month"));
    const season = String(form.get("season"));
    const date = String(form.get("date"));
    const year = Number(form.get("year"));
    const seed = date.length + month * 3 + year + season.length * 5;
    const amount = Number(((month >= 6 && month <= 9 ? 2.5 : month >= 10 && month <= 11 ? 1.2 : 0.3) + (seed % 21) / 10).toFixed(1));
    const category = amount < 2.5 ? "Light Rain" : amount < 7.5 ? "Moderate Rain" : "High Rain";
    setPrediction({ amount, category, condition: amount < 2.5 ? "Cloudy with a chance of drizzle" : amount < 7.5 ? "Passing showers" : "Rain showers likely", icon: amount < 1.5 ? "sun" : amount < 4.5 ? "drizzle" : "rain" });
  };
  return <>
    <PageHeading eyebrow="PREDICTION DEMONSTRATION · 07" title="A forecast-shaped demo." description="Try the interaction flow for a future trained-model integration." />
    <div className="demo-alert"><span className="demo-pill">DEMO / SIMULATED</span><p>These outputs are illustrative only—not a real weather forecast. The historical regression model is not suitable for real-world prediction.</p></div>
    <div className="prediction-layout"><section className="chart-panel prediction-form-panel"><SectionHeading title="Prediction inputs" detail="Choose a date and seasonal context" /><form className="prediction-form" onSubmit={submit}><label>Date<Input name="date" type="date" required defaultValue="2025-07-15" /></label><div className="form-row"><label>Month<select name="month" defaultValue="7">{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{new Date(2025, i, 1).toLocaleString("en", { month: "long" })}</option>)}</select></label><label>Year<Input name="year" type="number" min="2016" max="2035" defaultValue="2025" required /></label></div><label>Season<select name="season" defaultValue="Southwest Monsoon"><option>Winter</option><option>Pre-monsoon</option><option>Southwest Monsoon</option><option>Post-monsoon</option></select></label><Button type="submit" className="predict-button"><CloudRain size={16} />Predict Rainfall</Button></form></section>
      <section className={`prediction-result ${prediction ? "prediction-ready" : ""}`} aria-live="polite"><div className="result-top"><span className="demo-pill">SIMULATED RESULT</span><span className="result-orbit"><Wind size={16} /></span></div>{prediction ? <><div className="result-weather">{prediction.icon === "sun" ? <Sun size={48} /> : prediction.icon === "drizzle" ? <CloudDrizzle size={48} /> : <CloudRain size={48} />}</div><span className="result-label">ESTIMATED RAINFALL</span><strong className="result-amount">{prediction.amount}<small>mm</small></strong><span className="result-category">{prediction.category}</span><div className="result-divider" /><p className="result-condition">{prediction.condition}</p></> : <div className="result-empty"><span><Cloud size={30} /></span><strong>Your demo result appears here</strong><p>Enter a date and select a season to generate a simulated estimate.</p></div>}<div className="result-disclaimer"><Info size={13} />For demonstration only · not a real forecast</div></section></div>
    <div className="notice-inline notice-wide"><Info size={15} /><span>Estimates are synthetic, generated in the browser for a classroom demonstration. No trained model or live weather service is connected.</span></div>
  </>;
}

function AboutPage() {
  const techniques = ["Probability analysis", "Descriptive statistics", "Seasonal analysis", "Hypothesis testing", "Pearson correlation", "Spearman correlation", "Simple linear regression"];
  return <>
    <PageHeading eyebrow="ABOUT THIS PROJECT · 08" title="The study behind the charts." description="A college AI/ML and statistical analysis project about Bengaluru’s rainfall patterns." />
    <section className="about-intro"><div className="about-icon"><CloudRain size={24} /></div><div><span className="welcome-kicker">PROJECT INTRODUCTION</span><h2>Statistical Analysis & Prediction of Rainfall Patterns in Bengaluru</h2><p>This project explores observed daily rainfall records, studies seasonal variation, compares two time periods, and demonstrates the shape of a prediction interface.</p></div></section>
    <div className="about-grid"><section className="chart-panel"><SectionHeading title="Study at a glance" /><div className="dataset-facts"><div><span>Location</span><strong>Bengaluru, India</strong></div><div><span>Study period</span><strong>1 Jan 2016 — 31 Dec 2025</strong></div><div><span>Daily observations</span><strong>3,653</strong></div><div><span>Dataset focus</span><strong>Daily rainfall (mm)</strong></div></div></section><section className="chart-panel"><SectionHeading title="Project objectives" /><ul className="objective-list"><li><i />Visualize annual and seasonal rainfall patterns.</li><li><i />Quantify rainy-day probability and descriptive statistics.</li><li><i />Test differences between two five-year periods.</li><li><i />Assess time–rainfall correlation and regression.</li><li><i />Demonstrate a simulated prediction workflow.</li></ul></section></div>
    <section className="chart-panel techniques-panel"><SectionHeading title="Statistical methodology" detail="Techniques used in this project" /><div className="technique-list">{techniques.map((technique, index) => <span key={technique}><i>{String(index + 1).padStart(2, "0")}</i>{technique}</span>)}</div></section>
    <div className="conclusion-band"><span><Droplets size={20} /></span><div><strong>Conclusion</strong><p>Rainfall in Bengaluru is seasonal, with higher verified daily mean rainfall during the Southwest Monsoon than Winter. Period comparisons are significant, while time alone has very weak correlation and limited predictive power.</p></div></div>
    <div className="notice-inline notice-wide"><Info size={15} /><span>Exact month-wise and year-wise historical values were not included in the brief. Charts that rely on unavailable source records are explicitly marked as illustrative samples.</span></div>
  </>;
}

const pages: Record<PageKey, () => ReactNode> = {
  overview: Overview,
  analysis: AnalysisPage,
  probability: ProbabilityPage,
  seasonal: SeasonalPage,
  hypothesis: HypothesisPage,
  correlation: CorrelationPage,
  prediction: PredictionPage,
  about: AboutPage,
};

export function RainfallPage({ page }: { page: PageKey }) {
  const Content = pages[page];
  return <div className="page-stack"><Content /></div>;
}