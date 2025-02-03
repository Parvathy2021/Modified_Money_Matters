import React, {useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import api from '../../services/api.js';

function TransactionList({budget_id}) {

    console.log("Received budget ID", budget_id);

    const [transactions, setTransactions] = useState([]);
    const {transService} = api;

    useEffect(() => {

        const fetchAllTransactions = async() => {
            if (!budget_id) {
                console.error("No budget ID");
                return;
            }
            try{
                const results = await transService.getAll(budget_id);
                console.log("Fetched transactions", results, budget_id);
                setTransactions(results);
            } catch (error) {
                console.error('Could not fetch transactions', error);
            }
        };
        if(budget_id){
            fetchAllTransactions();
        }
       
    }, [budget_id, transService]);
    

    return(
        <div>
            <SearchBar setTransactions = {setTransactions} budget_id={budget_id} />
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Tag</th>
                        <th>Description</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (<tr><td>No transactions available</td></tr>) : (
                    transactions.map((transaction,index) => (
                        <tr key={index}>
                            <td>{transaction.id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.tag_id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.created_date}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;