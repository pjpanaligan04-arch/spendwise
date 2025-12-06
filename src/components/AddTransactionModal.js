import React, { useState } from 'react';
import '../styles/shared.css';
import '../styles/addTransactionModal.css';

const CATEGORIES = ['Groceries','Bills','Rent','Clothing','Utilities','Food','Others'];

const CATEGORY_COLORS = {
  Groceries: '#f97316',
  Bills: '#ef4444',
  Rent: '#8b5cf6',
  Clothing: '#06b6d4',
  Utilities: '#f59e0b',
  Food: '#10b981',
  Others: '#64748b'
};

function colorForCategory(cat){
  return CATEGORY_COLORS[cat] || '#64748b';
}

export default function AddTransactionModal({ onClose, onSave }){
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [note, setNote] = useState('');

  function submit(){
    if(!amount || Number(amount) <= 0) return alert('Enter valid amount');
    onSave({ type, amount: Number(amount), category: type==='expense' ? category : 'Cash', date: new Date(date).toISOString(), note });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Add Transaction</h3>
            <div className="modal-sub">Record cash or expense</div>
          </div>
          <div className="modal-close">
            <button className="btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="segmented" role="tablist" aria-label="Transaction type">
          <button className={` ${type==='expense' ? 'active':''}`} onClick={()=>setType('expense')}>Expense</button>
          <button className={` ${type==='cash' ? 'active cash':''}`} onClick={()=>setType('cash')}>Cash</button>
        </div>

        <div className="form-row">
          <label>Amount</label>
          <input
            className=""
            autoFocus
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {type === 'expense' && (
          <div className="form-row">
            <label>Category</label>
            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        <div className="form-row">
          <label>Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Note (optional)</label>
          <input
            className="note-input"
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            placeholder="e.g. Grocery shopping"
          />
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>Save Transaction</button>
        </div>
      </div>
    </div>
  );
}
