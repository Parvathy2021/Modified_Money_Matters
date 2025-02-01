import React, {useState} from 'react';
import api from '../../services/api.js';

function SearchBar({ setTransactions}) {
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