import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import '../styles/shared.css';
import '../styles/charts.css';

const COLORS = ['#06b6d4','#4f46e5','#ef4444','#f59e0b','#10b981','#8b5cf6','#f97316'];

export default function Charts({ transactions }) {
  const data = useMemo(()=>{
    const byCat = {};
    transactions.filter(t=>t.type==='expense').forEach(t=>{ byCat[t.category] = (byCat[t.category]||0)+Number(t.amount); });
    return Object.entries(byCat).map(([name,value])=>({name, value}));
  }, [transactions]);

  const byDay = useMemo(()=>{
    const by = {};
    transactions.forEach(t=>{
      const d = new Date(t.date).getDate();
      by[d] = (by[d]||0) + (t.type==='expense' ? Number(t.amount) : 0);
    });
    return Object.keys(by).map(k=>({day:k, amt: by[k]}));
  }, [transactions]);

  return (
    <div className="charts-row">
      <div className="card chart-large">
        <h4 className="card-subtitle">Expenses by Category</h4>
        <div className="chart-sm">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={60} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card chart-side">
        <h4 className="card-subtitle">Daily expenses</h4>
        <div className="chart-md">
          <ResponsiveContainer>
            <BarChart data={byDay}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
