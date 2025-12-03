import React from 'react';
import TransactionList from './TransactionList';
import '../styles/shared.css';
import '../styles/history.css';

export default function History({ transactions, onDelete }){
  const sorted = [...transactions].sort((a,b)=> new Date(b.date) - new Date(a.date));

  return (
    <div className="history-wrapper">
      <div className="card">
        <h3 className="card-title">History</h3>
        <div className="muted">All transactions</div>
        <TransactionList transactions={sorted} onDelete={onDelete} showDelete={true} />
      </div>
    </div>
  );
}
