import React from 'react';
import '../styles/shared.css';
import '../styles/transactionList.css';

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
            <div className="tx-amount">${Number(tx.amount).toFixed(2)}</div>
            {showDelete && <button onClick={()=>onDelete && onDelete(tx.id)}>Delete</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
