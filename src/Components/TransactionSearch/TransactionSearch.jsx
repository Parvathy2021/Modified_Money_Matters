
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import TransactionList from "./TransactionList";
import { useNavigate } from "react-router-dom";


function TransactionSearch() {
    const { budget_id } = useParams();
    const navigate = useNavigate();


    return(
       <>
            <div>
                <h1>Transaction Search</h1>
                <TransactionList budget_id={budget_id} />
            </div>
            <div>  
                <button className="rounded-full px-4 py-2 bg-blue-500 text-white" onClick={(e) => navigate('/profile')}>Cancel</button>
            </div>
        </>
    )

}

export default TransactionSearch;