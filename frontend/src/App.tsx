import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashbord'
import SendMoney from './pages/SendMoney'
import EditProfile from './pages/EditProfile'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/signin" replace />} />
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/send' element={<SendMoney />}></Route>
        <Route path='/edit' element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
