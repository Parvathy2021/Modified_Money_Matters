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

                const transactionsTag = await Promise.all(results.map( async (transaction) => {
                    console.log("Processing transaction", transaction);
                    if (transaction.tagId) {
                        const tagData = await transService.getTag(transaction.tagId);
                        console.log("Fetched tag data:", tagData);
                        return { ...transaction, tag: tagData};
                    } else {
                        return {...transaction, tag: null};
                    }
                }))


                setTransactions(transactionsTag);
            } catch (error) {
                console.error('Could not fetch transactions', error);
            }
        };
        if(budget_id){
            fetchAllTransactions();
        }
       
    }, [budget_id, transService]);

    const formatDate= (dateStr) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-US', {
            
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
    }
    

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
                            <td>{transaction.tag ? transaction.tag.name : 'No tag'}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.createdDate ? formatDate(transaction.createdDate) : 'No Date'}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;