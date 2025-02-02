import { split } from 'postcss/lib/list';
import React, {useState, useEffect} from 'react';
import api from '../../services/api.js';
import {useNavigate, Link} from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import TagManagement from '../Tag/TagManagement.jsx';

function Transaction() {
  const { user } = useAuth();
  const [budget_id, setBudgetId] = useState("");
  const [budgetList, setBudgetList] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [recurringDate, setRecurring] = useState(null);
  const [tag_id, setTag_Id] = useState("");
  const [splits, setSplits] = useState([]); 
  const [splitAmount, setSplitAmount] = useState("");
  const [isSplits, setIsSplits] = useState(false);
  const navigate = useNavigate();
  const { transService, budgetService } = api;



  useEffect(() => {
    const budgetList = async() =>{

        if (!user?.userId) {
            console.error("User ID is not available");
            return;
        }

      try{
        const result = await budgetService.getByUser(user.userId);
        setBudgetList(result);
      } catch (error) {
        console.error("Error fetching budget data", error);
      }
    };
    if(user?.userId) {
        budgetList();
    } else {
        console.log("User is not defined. Please log in.");
    }
  } ,[user]);

  const handleChange = (e) => {
    setBudgetId(e.target.value);
  }

    if (!user) {
        console.log("User is not defined. Please log in.");
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-black">Please log in to add transactions</p>
          <Link to="/login">
            <button
              className="mt-4 w-full py-2 bg-lightblue text-white rounded-md hover:bg-green 
                        hover:text-black focus:outline-none focus:ring-2 focus:ring-blue"
            >
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }


  const handleAddSplit = (e) => {
    e.preventDefault();
    if (splitAmount && tag_id) {
      const newSplit = {
        amount: parseFloat(splitAmount),
        tag_id,
        tagName:
          document.querySelector(`[data-tag-id="${tag_id}"]`)?.textContent ||
          "Unknown Tag",
      };
      setSplits([...splits, newSplit]);
      setSplitAmount("");
    } else {
      alert("Please enter split amount and select a tag");
    }
  };

  const SplitsList = () => (
    <div className="mt-4">
      <h3 className="font-medium">Current Splits:</h3>
      <div className="space-y-2">
        {splits.map((split, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>
              {split.tagName}: ${split.amount}
            </span>
            <button
              type="button"
              onClick={() => setSplits(splits.filter((_, i) => i !== index))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!user || !user.userId) {
    console.error("🚨 Error: User is not defined in handleSubmit!");
    alert("Authentication issue detected. Please log in again.");
    return;
  }

    const transaction = {
      amount: Number(amount),
      description,
      isRecurring,
      isIncome,
      recurringDate,
      splits,
      isSplits,
    };

    const params = {
      user_id: user.userId,
      budget_id:
        budget_id && !isNaN(Number(budget_id)) ? Number(budget_id) : null,
      tag_id: Number(tag_id),
    };

    console.log("Submitting transaction with params:", params);

    try {
      const response = await transService.add(transaction, params);
      console.log("Transaction saved:", response);
      alert("Transaction saved successfully!");
      navigate("/transaction/add");
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Error saving transaction. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-black">
          New Transaction
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-black">
            <div>
              <label className="block">Budget</label>
              <select id="budgetSelect" value={budget_id} onChange={handleChange}>
            <option value=''>Please Select a Budget</option>
            {budgetList.map(budget => (
            <option key={budget.id} value={budget.id}>{budget.name}</option>
            ))}
          </select>
            </div>

            <div>
              <label className="block">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isIncome}
                  onChange={(e) => setIsIncome(e.target.checked)}
                />
                <span>Is this an income transaction?</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
                <span>Is this a recurring transaction?</span>
              </label>

              {isRecurring && (
                <div>
                  <label className="block">Recurring Day (1-31)</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={recurringDate || ""}
                    onChange={(e) => setRecurring(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={isSplits}
                  onChange={() => {
                    setIsSplits(!isSplits);
                    setSplits([]); 
                  }}
                />
                <span>Split this transaction across multiple tags?</span>
              </label>

              {isSplits ? (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={splitAmount}
                      onChange={(e) => setSplitAmount(e.target.value)}
                      placeholder="Split amount"
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddSplit}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Split
                    </button>
                  </div>
                  <SplitsList />
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-2">
                  Select a single tag for this transaction:
                </p>
              )}

              <TagManagement
                tag_id={tag_id}
                onTagSelect={(id) => setTag_Id(id)}
              />
            </div>

          
            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="flex-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save Transaction
              </button>
              <Link to="/profile" className="flex-1">
                <button
                  type="button"
                  className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Transaction;
//     try {
//       const response = await transService.add(transaction, params);
//       console.log("Transaction saved:", response);

//       requestFormReset();
//       navigate("/transaction/add");
//     } catch (error) {
//       console.log("Transaction error:", error);
//       if (error.response) {
//         console.error("API response error data:", error.response.data);
//       }
//       alert("There was an error saving the Transaction!");
//     }

//     navigate("/transaction/add");
//     setBudget_Id("");
//     setAmount("");
//     setDescription("");
//     setIsIncome(false);
//     setIsRecurring(false);
//     setRecurring(null);
//     setTag_Id("");
//     setSplits([]);
//     setIsSplits(false);
//     setSplitAmount("");
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen bg-black">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h1 className="text-2xl font-semibold text-center mb-6 text-black">
//             New Transaction
//           </h1>

//           <form onSubmit={handleSubmit}>
//             <div className="block text-black">
//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                 Budget{" "}
//                 <input
//                   type="text"
//                   value={budget_id}
//                   onChange={(e) => setBudget_Id(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
//                 ></input>
//               </label>

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                 Amount
//                 <input
//                   type="text"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
//                 ></input>
//               </label>

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                 Select if transaction is income:
//                 <input
//                   type="checkbox"
//                   checked={isIncome}
//                   onChange={(e) => setIsIncome(e.target.checked)}
//                   className="mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block"
//                 ></input>
//               </label>

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block">
//                 Select if transaction needs Split Tags:
//                 <input
//                   type="checkbox"
//                   checked={isSplits}
//                   onChange={() => setIsSplits(!isSplits)}
//                   className="mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block"
//                 ></input>
//               </label>
//               {isSplits && (
//                 <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                   Amount (Split)
//                   <input
//                     type="text"
//                     value={splitAmount}
//                     onChange={(e) => setSplitAmount(e.target.value)}
//                     className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
//                   ></input>
//                   <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                     Tag (Split)
//                     <input
//                       type="text"
//                       value={tag_id}
//                       onChange={(e) => setTag_Id(e.target.value)}
//                       className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
//                     ></input>
//                   </label>
//                   <button
//                     className="w-full py-2 bg-lightblue text-white rounded-md hover:bg-green 
//                                                  hover:text-black focus:outline-none focus:ring-2 focus:ring-blue"
//                     type="button"
//                     onClick={handleAddSplit}
//                   >
//                     {" "}
//                     Add Split{" "}
//                   </button>
//                 </label>
//               )}

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block">
//                 Select if transaction is recurring:
//                 <input
//                   type="checkbox"
//                   checked={isRecurring}
//                   onChange={(e) => {
//                     console.log("Box status", e.target.checked);
//                     setIsRecurring(e.target.checked);
//                   }}
//                   className="mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue block"
//                 ></input>
//               </label>

//               {isRecurring && (
//                 <label className="mt-2 p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                   {" "}
//                   Recurring Day's Date (1-31)
//                   <input
//                     type="text"
//                     value={recurringDate}
//                     onChange={(e) => setRecurring(e.target.value)}
//                     className="mt-2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue bg-white"
//                   ></input>
//                 </label>
//               )}

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                 Description
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="mt-2 p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block"
//                 ></input>
//               </label>

//               <label className="mt-2 p-2 w-full border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue block">
//                 Tag
//                 <input
//                   type="text"
//                   value={tag_id}
//                   onChange={(e) => setTag_Id(e.target.value)}
//                   className="mt-2 p-2 w-full border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
//                 ></input>
//               </label>

//               <button
//                 className="w-full py-2 bg-lightblue text-white rounded-md hover:bg-green 
//                             hover:text-black focus:outline-none focus:ring-2 focus:ring-blue"
//               >
//                 Submit
//               </button>

//               <Link to="/profile">
//                 <button className="rounded-full px-4 py-2 bg-blue-500 text-white">
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//             <div className="mt-4">
//               <TagManagement
//                 tag_id={tag_id}
//                 onTagSelect={(id) => setTag_Id(id)}
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Transaction;

