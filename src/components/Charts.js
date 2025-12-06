import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import '../styles/shared.css';
import '../styles/charts.css';
import { formatPeso } from '../utils/format';

const COLORS = ['#06b6d4','#4f46e5','#ef4444','#f59e0b','#10b981','#8b5cf6','#f97316'];

export default function Charts({ transactions }) {
  const data = useMemo(()=>{
    const byCat = {};
    transactions.filter(t=>t.type==='expense').forEach(t=>{ byCat[t.category] = (byCat[t.category]||0)+Number(t.amount); });
    return Object.entries(byCat).map(([name,value])=>({name, value}));
  }, [transactions]);

  return (
    <div className="charts-row">
      <div className="card chart-large">
        <h4 className="card-subtitle">Expenses by Category</h4>
        {data.length > 0 ? (
          <>
            <div className="chart-large">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" outerRadius={70} innerRadius={35}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="no-data">
            <div className="muted">No expenses this month</div>
          </div>
        )}
      </div>
    </div>
  );
}
