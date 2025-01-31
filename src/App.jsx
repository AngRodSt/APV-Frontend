import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicLayout from "./layout/PublicLayout"
import PrivateLayout from "./layout/PrivateLayout"

import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import ResetPassword from "./pages/public/ResetPassword"
import AuthAccount from "./pages/public/AuthAccount"
import NewPassword from "./pages/public/NewPassword"

import AdminPatients from "./pages/private/AdminPatients"
import AdminProfile from "./pages/private/AdminProfile"

import { AuthProvider } from "./context/AuthProvider"
import { PatientProvider } from "./context/PatientsProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
        <Routes>

          <Route path="/" element={<PublicLayout />}>
            {<Route index element={<Login />} />}
            {<Route path="register" element={<Register />} />}
            {<Route path="reset-password" element={<ResetPassword />} />}
            {<Route path="reset-password/:token" element={<NewPassword />} />}
          </Route>
          <Route path="/confirm/:id" element={<AuthAccount />}></Route>
          
          <Route path="/admin" element={<PrivateLayout />}>
            {<Route index element={<AdminPatients />} />}
            {<Route path="profile" element={<AdminProfile />} />}
          </Route>

        </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
