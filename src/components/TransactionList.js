import React from 'react';
import '../styles/shared.css';
import '../styles/transactionList.css';
import { formatPeso } from '../utils/format';

export default function TransactionList({ transactions, onDelete, showDelete=true }){
  if(!transactions || transactions.length===0) return <div className="no-tx">No transactions</div>;

  return (
    <div className="tx-list">
      {transactions.map(tx=> (
        <div key={tx.id} className={`tx-item ${tx.type}`}>
          <div className="tx-left">
            <div className={`tx-chip ${tx.type}`}></div>
            <div>
              <div className="tx-title">{tx.type==='expense' ? tx.category : 'Cash'}</div>
              <div className="tx-date">{new Date(tx.date).toLocaleString()}</div>
            </div>
          </div>
          <div className="tx-right">
            <div className="tx-amount">{formatPeso(Number(tx.amount))}</div>
            {showDelete && (
              <button className="tx-delete-btn" onClick={()=>onDelete && onDelete(tx.id)} aria-label="Delete transaction">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 6h18" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11v6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
