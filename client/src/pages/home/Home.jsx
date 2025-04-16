import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

import moneyImage from '../../assets/money-gold-coin-growth-concept-illustration-stacks-of-gold-coin-like-income-graph-with-dollar-free-vector.jpg'
import img1 from '../../assets/ex-pie2.png'
import img2 from '../../assets/ex-bar2.png'
import MoneyMatters from '../../assets/Money Matters.png'
const Home = () => {
  return (
    <div>
      <article className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section className="min-h-full snap-start flex items-center justify-center">
          <div className="flex-1 flex items-center justify-center">
            <article>
              <img src={MoneyMatters} alt="Money" className="mx-auto w-3.75/4 font-bold" // Centers and resizes the image
              />
            </article>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <article>
              <h1 className="text-center text-6xl font-extrabold">
                Money Matters
              </h1>
            </article>
          </div>
        </section>

        <section className="min-h-full snap-start flex items-center justify-center">
        <div className="flex-1 flex items-center justify-center">
            <article>
              <img src={img2} alt="Money" className="mx-auto" />
            </article>
          </div>
          <div className="flex-1 text-center">
            <article>
              <h1>Vizualize Your Budget</h1>
              <br />
              <p>See your finances clearly with interactive charts and easy-to-read visuals. Gain a better understanding of your spending patterns and budgeting trends, so you can make more informed decisions and stay on track to reach your goals.</p>
            </article>
          </div>
        </section>
        <section className="min-h-full snap-start flex items-center justify-center">
          <div className="flex-1 text-center">
            <article>
              <h1>Track Your Expenses</h1>
              <br />
              <p>Stay on top of where your money is going. Effortlessly categorize and monitor your daily expenses, so you can identify trends, adjust your habits, and make informed decisions. With real-time tracking, you'll always know exactly where you stand.</p>
            </article>
          </div>
          <div className="flex-1 text-center">
            <article>
              <img src={img1} alt="Money" className="mx-auto" />
            </article>
          </div>
        </section>
        <section className="min-h-full snap-start flex items-center justify-center">
          <div className="flex-1 text-center">
            <article>
              <img src={moneyImage} alt="Money" className="mx-auto" />
            </article>
          </div>
          <div className="flex-1 text-center">
            <article>
              <h1>Get Started</h1>
              <br />
              <Link to="/login">
                <button className="rounded-full px-4 py-2 bg-blue-500 text-white">Login</button>
              </Link>
              <br />
              <br />
              <Link to="/register">
                <button className="rounded-full px-4 py-2 bg-blue-500 text-white">Register</button>
              </Link>
                
            </article>
          </div>
        </section>
      </article>

    </div>
  )
}

export default Home