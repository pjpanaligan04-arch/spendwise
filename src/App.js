import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Overview from './components/Overview';
import History from './components/History';
import AddTransactionModal from './components/AddTransactionModal';

const TAB_OVERVIEW = 'overview';
const TAB_HISTORY = 'history';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(TAB_OVERVIEW);
  const [showAdd, setShowAdd] = useState(false);
  const [monthDate, setMonthDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    const raw = localStorage.getItem('transactions');
    if (raw) setTransactions(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(tx) {
    setTransactions((t) => [{ ...tx, id: Date.now() }, ...t]);
    setShowAdd(false);
  }

  function deleteTransaction(id) {
    setTransactions((t) => t.filter((x) => x.id !== id));
  }

  return (
    <div className="app-root">
      <Header
        monthDate={monthDate}
        setMonthDate={setMonthDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="app-main">
        {activeTab === TAB_OVERVIEW ? (
          <Overview
            transactions={transactions}
            monthDate={monthDate}
            onOpenAdd={() => setShowAdd(true)}
          />
        ) : (
          <History transactions={transactions} onDelete={deleteTransaction} />
        )}
      </main>

      <button
        className="fab"
        title="Add"
        onClick={() => setShowAdd(true)}
      >
        +
      </button>

      {showAdd && (
        <AddTransactionModal
          onClose={() => setShowAdd(false)}
          onSave={addTransaction}
        />
      )}
    </div>
  );
}

export default App;
