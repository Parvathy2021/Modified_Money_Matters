
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import TransactionList from "./TransactionList";
import { useNavigate } from "react-router-dom";


function TransactionSearch() {
    const { budget_id } = useParams();
    const navigate = useNavigate();


    return(
       <>
        
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray">Transaction Search</h1>
        <div className="flex justify-center items-center">
                <TransactionList budget_id={budget_id} />
        </div>
            
        </>
    )

}

export default TransactionSearch;