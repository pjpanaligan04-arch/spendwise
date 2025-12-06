import React, { useMemo } from 'react';
import '../styles/shared.css';
import '../styles/overview.css';
import Charts from './Charts';
import { formatPeso } from '../utils/format';

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth()+1, 0, 23,59,59); }

export default function Overview({ transactions, monthDate, onOpenAdd }) {
  const { monthTx, totals } = useMemo(()=>{
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const monthTx = transactions.filter(t => {
      const td = new Date(t.date);
      return td >= start && td <= end;
    });
    const totals = {
      cash: monthTx.filter(t=>t.type==='cash').reduce((s,t)=>s+Number(t.amount),0),
      expenses: monthTx.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0),
    };
    totals.balance = totals.cash - totals.expenses;
    return { monthTx, totals };
  }, [transactions, monthDate]);

  return (
    <div className="overview-grid">
      <div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">This Month</h3>
          </div>

          <div className="summary-container mt-12">
            <div className="balance-item">
              <div className="muted small">Balance</div>
              <div className="amount large">{formatPeso(totals.balance)}</div>
            </div>
            <div className="cash-expenses">
              <div className="item cash">
                <div className="muted small">Cash</div>
                <div className="amount">{formatPeso(totals.cash)}</div>
              </div>
              <div className="item expenses">
                <div className="muted small">Expenses</div>
                <div className="amount">{formatPeso(totals.expenses)}</div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <Charts transactions={monthTx} />
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <h4 className="card-subtitle">Insights</h4>
          <div className="muted">Top categories this month</div>
          <div className="mt-10">
            {/* quick category list */}
            {Object.entries(monthTx.filter(t=>t.type==='expense').reduce((acc, t) => {
              acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
              return acc;
            }, {})).sort(([,a], [,b]) => b - a).slice(0,6).map(([c, amount]) => (
              <div key={c} className="category-row">
                <div>{c}</div>
                <div className="muted small">{formatPeso(amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
