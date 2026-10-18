import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResumeKitPage from './pages/ResumeKit'
import { Route, Routes, useLocation } from 'react-router-dom'
import AdminLayout from './components/admin-view/layout'
import AdminPaymentsView from './components/admin-view/payments'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/Terms&conditions'
import Disclaimer from './pages/Disclaimer'
import RefundPolicy from './pages/RefundPolicy'
import ContactUsPage from './pages/ContactUs'

function App() {
   const { pathname } = useLocation();

   useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    
    return () => clearTimeout(timer);
  }, [pathname]);



  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path='/' element={<ResumeKitPage/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms-and-conditions' element={<TermsConditions/>}/>
        <Route path='/disclaimer' element={<Disclaimer/>}/>
        <Route path='/refund-policy' element={<RefundPolicy/>}/>
        <Route path='/contact-us' element={<ContactUsPage/>}/>
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="payments" element={<AdminPaymentsView />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App