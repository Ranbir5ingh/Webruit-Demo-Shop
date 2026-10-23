import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <div className="bg-[#0a0a0a] text-white text-center text-[0.72rem] sm:text-[0.78rem] font-medium tracking-wide px-4 py-2">
          Demo store — dummy checkout, no real payments.
          <span className="text-white/60"> This site is tracked live by </span>
          <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent font-semibold">Webruit</span>
          <span className="text-white/60">.</span>
        </div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
