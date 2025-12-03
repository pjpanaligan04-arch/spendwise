import React, { useMemo } from 'react';
import '../styles/shared.css';
import '../styles/overview.css';
import Charts from './Charts';
import TransactionList from './TransactionList';

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

          <div className="summary mt-12">
            <div className="item">
              <div className="muted small">Cash</div>
              <div className="amount">${totals.cash.toFixed(2)}</div>
            </div>
            <div className="item">
              <div className="muted small">Expenses</div>
              <div className="amount">${totals.expenses.toFixed(2)}</div>
            </div>
            <div className="item">
              <div className="muted small">Balance</div>
              <div className="amount">${totals.balance.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-14">
            <Charts transactions={monthTx} />
          </div>

          <div className="mt-12">
            <TransactionList transactions={monthTx} showDelete={false} />
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <h4 className="card-subtitle">Insights</h4>
          <div className="muted">Top categories this month</div>
          <div className="mt-10">
            {/* quick category list */}
            {Array.from(new Set(transactions.filter(t=>t.type==='expense').map(t=>t.category))).slice(0,6).map((c)=> (
              <div key={c} className="category-row">
                <div>{c}</div>
                <div className="muted small">$0.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
