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

  function changeYear(delta) {
    const newYear = year + delta;
    setMonthDate(new Date(newYear, monthDate.getMonth(), 1));
  }

  function pickMonth(idx) {
    setMonthDate(new Date(year, idx, 1));
    setOpenMenu(false);
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
                <button className="year-arrow" onClick={() => changeYear(-1)}>←</button>
                <div className="dropdown-year">{year}</div>
                <button className="year-arrow" onClick={() => changeYear(1)}>→</button>
                <div className="muted small">Select month</div>
              </div>
              <div className="month-list">
                {monthItems.map(mi => (
                  <div key={mi.index} className={`month-item ${mi.index === monthDate.getMonth() ? 'active':''}`} onClick={()=>pickMonth(mi.index)}>
                    <div>{mi.name}</div>
                    <div className="muted small">{mi.index === monthDate.getMonth() ? 'Selected':''}</div>
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
