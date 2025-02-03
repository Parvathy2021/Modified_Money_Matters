
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart } from '../../components/pieChart/PieChart'
import { VertBarChart } from '../../Components/vertBarChart/VertBarChart'
import { Link, useNavigate } from "react-router-dom";
import AuthStatus from "../../components/auth/authStatus/AuthStatus";
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const {user} = useAuth();
  const [username, setUsername] = useState("")
  const [budgetName, setBudgetName] = useState("")
  const [monthlyExpenses, setMonthlyExpenses] = useState([])
  const [expenseTags, setExpenseTags] = useState([])
  const [yearlyIncome, setYearlyIncome] = useState([])
  const [yearlyExpenses, setYearlyExpenses] = useState([])
  const [budget_id, setBudgetId] = useState("");
  const [budgetList, setBudgetList] = useState([]);

  const user_id = user.userId;
  const {transService, budgetService} = api;
  const navigate = useNavigate();

  useEffect(() => {
    const budgetList = async() =>{

      try{
        const result = await budgetService.getByUser(user_id);
        setBudgetList(result);
      } catch (error) {
        console.error("Error fetching budget data", error);
      }
    };
    budgetList();
  } ,[]);

  const handleChange = (e) => {
    setBudgetId(e.target.value);
  }

  const findUsername = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/api/budgets/view/${user_id}`);
      setUsername(data.data.budget.user.username);
    } catch (e) {
      console.error(e);
    }
  };

  // const findBudgetName = async () => {
  //   try {
  //     const data = await axios.get("/budgets.json");
  //     setBudgetName(data.data.find((obj) => obj.user_id === user_id).name);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const findMonthlyExpenses = async () => {
    try {

      const fetchData = await axios.get(`http://localhost:8080/api/transactions/budget/${budget_id}`)
      const tagsData = await axios.get(`http://localhost:8080/api/tags/user/${user_id}`)

      let date = new Date().toISOString()
      let yearMonth = date.slice(0, 7)

      // console.log(8,fetchData)
      // console.log(7,tagsData.data);

      let filterArr = fetchData.data.filter(obj => !obj.income && obj.createdDate.startsWith(yearMonth))

      // console.log(26,filterArr);

      let allExpenses = [...filterArr]

      // console.log(6,allExpenses);

      let tagExpenseObj = {}

      allExpenses.forEach(item => {
        let tag = tagsData.data.find(tag => tag.id === item.tagId).name

        if (tagExpenseObj[tag]) {
          tagExpenseObj[tag] += item.amount
        } else {
          tagExpenseObj[tag] = item.amount
        }
      })

      // console.log(3, tagExpenseObj);

      let expenses = [];
      for (let tag in tagExpenseObj) {
        expenses.push({ [tag]: tagExpenseObj[tag] });
      }

      console.log(expenses);
      setMonthlyExpenses(expenses)
    } catch (e) {
      console.error(e)
    }
  }

  const findYearlyData = async () => {
    try {
      const fetchData = await axios.get(`http://localhost:8080/api/transactions/budget/${budget_id}`)
      
      let date = new Date()
      let year = date.getFullYear().toString()
      // console.log(5, fetchData);

      let filterYearIncome = fetchData.data.filter(obj => obj.income && obj.createdDate.startsWith(year))

      let filterYearExpenses = fetchData.data.filter(obj => !obj.income && obj.createdDate.startsWith(year))

      let yearIncome = []
      let yearExpenses = []

      for (let month = 1; month <= 12; month++) {
        let monthYear
        if (month < 10) {
          monthYear = year + "-0" + month.toString()
        } else {
          monthYear = year + "-" + month.toString()
        }

        let monthIncome = filterYearIncome.filter(obj => obj.createdDate.startsWith(monthYear))

        let monthExpenses = filterYearExpenses.filter(obj => obj.createdDate.startsWith(monthYear))

        let totalMonthIncome = 0
        let totalMonthExpenses = 0

        monthIncome.forEach(obj => {
          totalMonthIncome += obj.amount
        })

        monthExpenses.forEach(obj => {
          totalMonthExpenses += obj.amount
        })

        yearIncome[month - 1] = totalMonthIncome
        yearExpenses[month - 1] = totalMonthExpenses
      }

      setYearlyIncome(yearIncome)
      setYearlyExpenses(yearExpenses)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    findUsername()
    // findBudgetName()
  }, [])

  useEffect(() => {
    if (budget_id) {
      findMonthlyExpenses();
      findYearlyData()
    }
  }, [budget_id]);


  return (
    <>
      <h1 className='text-6xl'>Profile: {username}</h1>
      <p>{budgetName}</p>

      <div>
          <Link to="/budget/add">
            <button className="my-8 mx-2 px-4 rounded-full px-4 py-2 bg-blue-500 text-white">Create Budget</button>
          </Link>
          <Link to="/transaction/add">
          <button className="my-8 mx-2 px-4 rounded-full px-4 py-2 bg-blue-500 text-white">Add Transaction</button>
        </Link>
      </div>
      <div> 
        <select id="budgetSelect" value={budget_id} onChange={handleChange} className= "mx-4 ">
          <option value=''>Please Select a Budget</option>
            {budgetList.map(budget => (
          <option key={budget.id} value={budget.id}>{budget.name}</option>
            ))}
        </select>
        <button className="rounded-full px-4 py-2 bg-blue-500 text-white" onClick={(e) => {console.log("Navigating to: ", `/transaction/budget/${budget_id}`); navigate(`/transaction/budget/${budget_id}`)}}>Search Transactions</button>
      </div>
             
      <div class="flex space-x-24">
      
        <PieChart budgetName={budgetName} monthlyExpenses={monthlyExpenses} />
        <VertBarChart yearlyIncome={yearlyIncome} yearlyExpenses={yearlyExpenses} />
      </div>
    </>
  )
}


export default Profile;