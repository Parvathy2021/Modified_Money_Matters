import React, {useState} from 'react';
import api from '../../services/api.js';
import {useNavigate, Link} from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function CreateBudget(){

    const { user } = useAuth();
    const [name, setName] = useState('');


    const {budgetService} = api;
    const navigate = useNavigate();

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

      const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user || !user.userId) {
            console.error("🚨 Error: User is not defined in handleSubmit!");
            alert("Authentication issue detected. Please log in again.");
            return;
          }

          const budget = {
                name
            }

          const params = {
            user_id: user.userId
          }

          try{
            const response = await budgetService.add(budget, params);
            console.log("Budget created: ", response);
            alert("Budget created successfully!");
            navigate("/profile")

          } catch (error) {
            console.log("Budget error: ", error);
            alert("Error saving budget. Please try again.");

          }
      };

      return (
        <>
            <div>
                <h1>New Budget</h1>
                <form>
                    <div>
                        <label>Budget Name
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                            ></input>
                        </label>
                    </div>
                </form>
            </div>


        </>

      )

}