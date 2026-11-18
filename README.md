 # bengaluru-rainfall

A comprehensive, single-page dashboard application recreating the "Rainfall Atlas" design. This project provides a statistical analysis and visualization of Bengaluru's daily rainfall patterns from 2016 to 2025.

The implementation focuses strictly on visual fidelity and layout matching based on the provided reference screenshots. It does not include backend services or real weather API integrations; all data visualizations rely on the provided static datasets or illustrative sample data.

## Purpose

This project is a college AI/ML and statistical analysis demonstration. It explores a decade of daily rainfall records, studies seasonal variation, compares two time periods, and demonstrates the shape of a prediction interface. The goal is to present complex statistical findings in a clean, accessible, and highly polished user interface.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Recharts 3
- Lucide React
- Oxlint

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Getting Started

Install dependencies:

    npm install

Start the development server:

    npm run dev

The app will be available at the local Vite URL, typically `https://rainfallanalysis.lovable.app/`.

Build for production:

    npm run build

This runs TypeScript type-checking (`tsc -b`) followed by the Vite build.

Preview the production build:

    npm run preview

Lint the project:

    npm run lint

## Dataset: Seasonal Rainfall Results

The following table outlines the calculated seasonal rainfall statistics for Bengaluru, derived from the `Seasonal_Rainfall_Results.csv` dataset. These values serve as the foundation for the charts and metrics displayed in the Seasonal Analysis section.

| Season | Total Rainfall (mm) | Mean Daily (mm/day) | Observations | Rainy Days |
| :--- | :--- | :--- | :--- | :--- |
| Winter | 491.6 | 0.5444 | 903 | 139 |
| Pre-monsoon | 1846.8 | 2.0074 | 920 | 359 |
| Southwest monsoon | 5675.9 | 4.6524 | 1220 | 1094 |
| Post-monsoon | 2175.4 | 3.5662 | 610 | 379 |

**Notes:**
- **Winter** and **Southwest monsoon** mean daily values are provided as verified findings, aligning with the metrics shown in the UI (0.5444 mm/day and 4.6524 mm/day respectively).
- The **Pre-monsoon** and **Post-monsoon** values are included in the dataset but are treated as illustrative samples in the application's charts to maintain consistency with the verified scope of the study.
## Application Structure & Views

The application is divided into eight primary sections accessible via the left sidebar navigation. Each section corresponds to a specific image in the design reference.

### 1. Overview
<img width="1902" height="1076" alt="Screenshot 2026-11-18 090140" src="https://github.com/user-attachments/assets/a4fcf6be-c6af-48da-9467-23c5294fd118" />

The landing page providing a high-level summary of the project. It features top-level metrics including total observations (3,653), rainy days (1,971), no-rain days (1,682), and heavy rainfall days (3). It includes a year-wise rainfall bar chart showing annual totals across the decade.

### 2. Historical Analysis
<img width="1901" height="1076" alt="Screenshot 2026-11-18 090200" src="https://github.com/user-attachments/assets/10b84d2c-cf80-4b1b-ae95-cfe47b0d1a1f" />

Focuses on yearly, monthly, seasonal, and daily distributions. It includes:
- A detailed year-wise rainfall analysis bar chart with trend lines.
- A month-wise distribution chart showing average daily rainfall.
- A seasonal pattern chart comparing Winter, Pre-monsoon, SW monsoon, and Post-monsoon.

### 3. Probability
<img width="1902" height="1065" alt="Screenshot 2026-11-18 090215" src="https://github.com/user-attachments/assets/8214390d-6f62-4868-b5e8-9b5b4f82703c" />

Explores the odds of rain based on observed frequencies. It displays:
- Summary cards for Rainy, No-rain, and Heavy rainfall days with exact percentages.
- A donut chart illustrating the split between rainy and non-rainy days.
- A detailed table categorizing rainfall intensity (No Rain, Light, Moderate, High, Heavy) with corresponding counts.

### 4. Seasonal Analysis
<img width="1895" height="1068" alt="Screenshot 2026-11-18 090227" src="https://github.com/user-attachments/assets/ed77cb77-5e5f-4c6c-bceb-811d1644608c" />

Breaks down daily rainfall patterns through the Bengaluru year. It highlights:
- Key metrics for Southwest Monsoon (4.6524 mm/day) and Winter (0.5444 mm/day).
- A calculated Monsoon / Winter ratio (8.55x).
- A bar chart comparing the average daily rainfall across all four seasons, noting that non-monsoon values are illustrative.

### 5. Hypothesis Testing
<img width="1896" height="1055" alt="Screenshot 2026-11-18 090242" src="https://github.com/user-attachments/assets/aeeea41a-8900-47eb-9701-f40b9b717309" />

Compares summary statistics across the first (2016-2020) and second (2021-2025) halves of the study. It presents:
- Side-by-side comparison cards detailing Mean rainfall, Variance, Standard deviation, Rainy days, and Heavy rainfall days.
- Statistical test results showing Welch's t-test (0.013336) and Levene's test (0.015292), indicating statistically significant differences between periods.

### 6. Correlation & Regression
<img width="1892" height="1060" alt="Screenshot 2026-11-18 090306" src="https://github.com/user-attachments/assets/478ed86a-2cac-41ef-b10e-f5e7a84f3ef4" />

Assesses the relationship between time and daily rainfall. It displays:
- Key statistical metrics: Pearson correlation (0.051664), Spearman correlation (0.080612), R-squared (0.002669), and Slope p-value (0.0017867).
- A scatter plot with a fitted regression line illustrating daily rainfall over time.
- The regression equation: `Rainfall_mm = 2.295889 + (0.00027027 * Time_days)`.

### 7. Rainfall Prediction
<img width="1893" height="1048" alt="Screenshot 2026-11-18 090345" src="https://github.com/user-attachments/assets/91772573-8ef1-43ed-b238-2ab890513efe" />

A forecast-shaped interactive demo. It includes:
- A form to select a Date, Month, Year, and Season.
- A "Predict Rainfall" button.
- A simulated result display showing the estimated rainfall (e.g., 4.5 mm) and the corresponding category (e.g., Moderate Rain).
- Clear disclaimers that the estimates are synthetic and generated in the browser for demonstration purposes only.

### 8. About This Project
<img width="1883" height="1062" alt="Screenshot 2026-11-18 090358" src="https://github.com/user-attachments/assets/e5ab3008-2d0e-492b-b6e7-77220aac6ab1" />

Provides context for the study. It outlines:
- The project introduction and core objective.
- A "Study at a glance" section detailing the Location (Bengaluru, India), Study period (1 Jan 2016 – 31 Dec 2025), Daily observations (3,653), and Dataset focus.
- A list of Project Objectives (Visualize patterns, Quantify probability, Test differences, Assess correlation, Demonstrate prediction).
- A breakdown of the Statistical methodology used (Probability analysis, Descriptive statistics, Seasonal analysis, Hypothesis testing, Pearson/Spearman correlation, Simple linear regression).
- A final Conclusion summarizing the findings.

## Design Scope

This project recreates the provided screens exactly.
- Layout, spacing, and responsive behavior follow the reference screenshots.
- Colors, borders, typography, and chart styling are matched precisely.
- No additional routes, hidden features, or UI elements beyond those shown are introduced.
- The visual style utilizes a dark sidebar for navigation and a light, spacious main content area with distinct card components.

## Project Structure

    bengaluru-rainfall/
      index.html
      package.json
      .oxlintrc.json
      src/
        main.tsx
        ...

## Linting

Oxlint is configured with the React, TypeScript, and Oxc plugins. The active rules are:
- `react/rules-of-hooks` — error — enforces the Rules of Hooks.
- `react/only-export-components` — warn — allows constant exports via `allowConstantExport`.

## License

Licensed under the Apache License, Version 2.0.

You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
