import React, {useState} from 'react';
import api from '../../services/api.js';

function SearchBar({ setTransactions, budgetId}) {

    console.log("Received budget ID:", budgetId);

    const [query, setQuery] = useState('');
     const {transService} = api;

    const handleSearch = async (e) => {
        e.preventDefault();

        if(query) {
            try {
                const results = await transService.search(query);
                setTransactions(results);
            } catch (error) {
                console.error('Could not fetch results', error);
            } 
        } else {
            try{
                console.log('Fetching all transactions', budgetId);
                const results = await transService.getAll(budgetId);
                setTransactions(results);
            } catch (error) {
                console.error("Could not fetch all transactions", error);
            }
        }

    };

    return (

        <form onSubmit={handleSearch}>
            <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )


}
export default SearchBar;