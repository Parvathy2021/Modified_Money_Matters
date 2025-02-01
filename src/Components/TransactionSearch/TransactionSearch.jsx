
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import TransactionList from "./TransactionList";


function TransactionSearch() {
    const { budgetId} = useParams();
    console.log("Selected Budget ID:", budgetId);

    return(
        <div>
            <h1>Transaction Search</h1>
            <TransactionList budgetId={budgetId} />
        </div>
    )

}

export default TransactionSearch;