import React, {useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import api from '../../services/api.js';

function TransactionList() {

    const [transactions, setTransactions] = useState([]);
    const {transService} = api;

    useEffect(() => {

        const fetchAllTranscations = async() => {
            try{
                const results = await transService.getAll();
                setTransactions(results);
            } catch (error) {
                console.error('Could not fetch transactions', error);
            }
        };
        fetchAllTranscations();
       
    }, []);
    

    return(
        <div>
            <SearchBar setTransactions = {setTransactions} />
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
                    {transactions.map((transaction,index) => (
                        <tr key={index}>
                            <td>{transaction.id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.tag_id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.created_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;