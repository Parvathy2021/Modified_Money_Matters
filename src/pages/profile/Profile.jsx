import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart } from '../../components/pieChart/PieChart'

const Profile = () => {
  const [userId, setUserId] = useState(1)
  const [username, setUsername] = useState("")
  const [budgetName, setBudgetName] = useState("")
  const [monthlyExpenses, setMonthlyExpenses] = useState([])
  const [expenseTags, setExpenseTags] = useState([])
  const [income, setIncome] = useState(0)

  const findUsername = async () => {
    try {
      const data = await axios.get('/users.json')
      setUsername(data.data.find(obj => obj.id === userId).username)
    } catch (e) {
      console.error(e)
    }
  }

  const findBudgetName = async () => {
    try {
      const data = await axios.get('/budgets.json')
      setBudgetName(data.data.find(obj => obj.user_id === userId).name)
    } catch (e) {
      console.error(e)
    }
  }

  const findMonthlyExpenses = async () => {
    try {
      const recurringData = await axios.get('/recurringTransactions.json')
      const transactionData = await axios.get('/transactions.json')
      const tagsData = await axios.get('./tags.json')

      let date = new Date().toISOString()
      let yearMonth = date.slice(0, 7)

      let recurringArr = recurringData.data.filter(obj => obj.user_id === userId && obj.isIncome === false && obj.created_date.startsWith(yearMonth))
      let transactionArr = transactionData.data.filter(obj => obj.user_id === userId && obj.isIncome === false && obj.created_date.startsWith(yearMonth))
      let recurringExpense = recurringArr.map(item => item.amount)
      let transactionExpense = transactionArr.map(item => item.amount)
      let expenses = [...recurringExpense, ...transactionExpense]
      setMonthlyExpenses(expenses)

      let recurringTags = recurringArr.map(item => tagsData.data.find(tag => tag.id === item.tag).name)
      let transactionTags = transactionArr.map(item => tagsData.data.find(tag => tag.id === item.tag).name)
      let tags = [...recurringTags, ...transactionTags]
      setExpenseTags(tags)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    findUsername()
    findBudgetName()
    findMonthlyExpenses()
    findYearlyData()
  }, [])

  return (
    <>
      <h1 className='text-6xl'>Profile: {username}</h1>
      <p>{budgetName}</p>
      <PieChart budgetName={budgetName} monthlyExpenses={monthlyExpenses} expenseTags={expenseTags} />
    </>
  )
}

export default Profile