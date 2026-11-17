import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  Activity, BarChart3, CloudRain, Droplets, FlaskConical, Gauge, LayoutDashboard,
  Menu, PieChart, Waves, Wind,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "Historical analysis", to: "/analysis", icon: BarChart3 },
  { label: "Probability", to: "/probability", icon: PieChart },
  { label: "Seasonal analysis", to: "/seasonal", icon: Wind },
  { label: "Hypothesis testing", to: "/hypothesis", icon: FlaskConical },
  { label: "Correlation & regression", to: "/correlation", icon: Activity },
  { label: "Rainfall prediction", to: "/prediction", icon: Gauge },
  { label: "About this project", to: "/about", icon: Waves },
] as const;

export function RainfallShell() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-frame">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <Link to="/" className="brand-lockup" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><CloudRain size={21} strokeWidth={2.1} /></span>
          <span className="brand-name">Rainfall<span>Atlas</span><small>BENGALURU · 2016–2025</small></span>
        </Link>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ label, to, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <span className="nav-indicator" />}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <span className="live-dot" />
          <span>Research dashboard</span>
          <span className="sidebar-year">10 yr</span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={19} />
          </Button>
          <div className="breadcrumb"><Droplets size={15} /><span>Bengaluru</span><span className="breadcrumb-slash">/</span><span>Rainfall insights</span></div>
          <div className="topbar-right"><span className="dataset-status"><span className="status-dot" />Dataset · 2016–25</span><span className="avatar-mark">TG</span></div>
        </header>
        <main className="main-content"><Outlet /></main>
        <footer className="app-footer"><span>Rainfall Atlas</span><span>Statistical analysis & prediction demonstration · Bengaluru</span></footer>
      </div>
      {mobileOpen && <Button variant="ghost" className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}