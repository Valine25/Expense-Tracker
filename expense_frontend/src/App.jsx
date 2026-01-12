import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [addForm,setAddForm]=useState(false);
  function handleClick(){
    setAddForm(true);
  }
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
      {addForm && (
        <div className="overlay">
        <div className="modal">
        <form>
          <input type="number" placeholder="Amount" />
          <input type="text" placeholder="Category" />
          <input type="date" placeholder="Date" />
          <button>Add</button>
        </form>
        </div>
      </div>
      )}
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

      <button className="fab" onClick={handleClick}>+</button>
    </div>
  );
}
