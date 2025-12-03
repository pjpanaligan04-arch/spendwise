import React, { useState, useMemo } from 'react';
import '../styles/shared.css';
import '../styles/header.css';

function formatMonth(d) {
  return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}

const MONTHS = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];

export default function Header({ monthDate, setMonthDate, activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(false);

  const year = monthDate.getFullYear();

  const monthItems = useMemo(()=>{
    return MONTHS.map((m, idx) => ({ name: m, index: idx }));
  }, []);

  const yearItems = useMemo(()=>{
    const start = 2025, end = 2050;
    const years = [];
    for(let y = start; y<= end; y++) years.push(y);
    // split into 3 rows
    const rows = [[],[],[]];
    years.forEach((y,i)=> rows[i % 3].push(y));
    return rows;
  }, []);

  function pickMonth(idx) {
    setMonthDate(new Date(year, idx, 1));
    setOpenMenu(false);
  }

  function pickYear(y) {
    setMonthDate(new Date(y, monthDate.getMonth(), 1));
    // keep dropdown open so user can also pick month if desired
  }

  return (
    <header className="header">
      <div className="brand">
        <img src="/logo.png" alt="Spendwise logo" className="brand-img" />
      </div>

      <div className="header-center">
        <button className="month-toggle" onClick={()=>setOpenMenu(s=>!s)} aria-expanded={openMenu} aria-controls="month-dropdown">
          <div className="month-label">{formatMonth(monthDate)}</div>
        </button>

        {openMenu && (
          <div id="month-dropdown" className="month-dropdown">
            <div className="card">
              <div className="dropdown-header">
                <div className="dropdown-year">{year}</div>
                <div className="muted small">Select month / year</div>
              </div>
              <div className="month-list">
                {monthItems.map(mi => (
                  <div key={mi.index} className={`month-item ${mi.index === monthDate.getMonth() ? 'active':''}`} onClick={()=>pickMonth(mi.index)}>
                    <div>{mi.name}</div>
                    <div className="muted small">{mi.index === monthDate.getMonth() ? 'Selected':''}</div>
                  </div>
                ))}
              </div>

              <div className="year-grid">
                <div className="year-heading muted">Years</div>
                {yearItems.map((row, rIdx) => (
                  <div key={rIdx} className="year-row">
                    {row.map(y => (
                      <div key={y} className={`year-item ${y === monthDate.getFullYear() ? 'active' : ''}`} onClick={()=>pickYear(y)}>{y}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="header-actions">
        <div className="tabs">
          <div className={`tab ${activeTab === 'overview' ? 'active':''}`} onClick={()=>setActiveTab('overview')}>Overview</div>
          <div className={`tab ${activeTab === 'history' ? 'active':''}`} onClick={()=>setActiveTab('history')}>History</div>
        </div>
      </div>
    </header>
  );
}
