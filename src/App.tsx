import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BuyMotorPolicy from './pages/BuyMotorPolicy'
import PolicyPreparation from './pages/PolicyPreparation'
import MyPolicies from './pages/MyPolicies'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/policies/buy-motor" element={<BuyMotorPolicy />} />
          <Route path="/policy-preparation" element={<PolicyPreparation />} />
          <Route path="/my-policies" element={<MyPolicies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
