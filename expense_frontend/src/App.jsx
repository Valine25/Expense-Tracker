import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/view")
      .then(res => res.json())
      .then(data => setExpenses(data));
  }, []);

  return (
    <div className="app">
      <h2 className="title">Expense Tracker</h2>

      <div className="card">
        <h3>Total Expenses</h3>
        <p>
          ₹{expenses.reduce((sum, e) => sum + Number(e.amount), 0)}
        </p>
      </div>

      <div className="list">
        {expenses.map(exp => (
          <div className="item" key={exp.id}>
            <div>
              <strong>{exp.category}</strong>
              <p className="date">{exp.date}</p>
            </div>
            <div className="amount">₹{exp.amount}</div>
          </div>
        ))}
      </div>

      <button className="fab">+</button>
    </div>
  );
}
