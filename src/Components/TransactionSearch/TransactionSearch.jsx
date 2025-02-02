
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import TransactionList from "./TransactionList";


function TransactionSearch() {
    const { budget_id } = useParams();
    console.log("Selected Budget ID:", budget_id);



    return(
        <div>
            <h1>Transaction Search</h1>
            <TransactionList budget_id={budget_id} />
        </div>
    )

}

export default TransactionSearch;