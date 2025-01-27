import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "../../components/pieChart/PieChart";
import AuthStatus from "../../components/auth/authStatus/AuthStatus";

const Profile = () => {
  const [userId, setUserId] = useState(1);
  const [username, setUsername] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState([]);
  const [income, setIncome] = useState(0);

  const findUsername = async () => {
    try {
      const data = await axios.get("/users.json");
      setUsername(data.data.find((obj) => obj.id === userId).username);
    } catch (e) {
      console.error(e);
    }
  };

  const findBudgetName = async () => {
    try {
      const data = await axios.get("/budgets.json");
      setBudgetName(data.data.find((obj) => obj.user_id === userId).name);
    } catch (e) {
      console.error(e);
    }
  };

  const findMonthlyExpenses = async () => {
    try {
      const data = await axios.get("/recurringTransactions.json");
      let arr = data.data.filter(
        (obj) => obj.user_id === userId && obj.isIncome === false
      );
      setMonthlyExpenses(arr.map((item) => item.amount));
      setExpenseDescription(arr.map((item) => item.description));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    findUsername();
    findBudgetName();
    findMonthlyExpenses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Add the AuthStatus component at the top of the profile page */}
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <AuthStatus />
      <div className="mt-6">
        <h1 className="text-6xl">Profile: {username}</h1>
        <p>{budgetName}</p>
        <PieChart
          budgetName={budgetName}
          monthlyExpenses={monthlyExpenses}
          expenseDescription={expenseDescription}
        />
      </div>
    </div>
  );
};

export default Profile;
