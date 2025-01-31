import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axios";


const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()

    if(email === ''){
        setAlert({msg: "The field cannot be empty", error:true})
    }

    try {
      const {data} = await axiosClient.post('/veterinarian/reset-password', {email})
      setAlert({msg: data.msg})
      
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }



  const {msg} = alert;

  return (
    <>
      <div className="hidden md:block overflow-hidden">
        <img className="w-full h-full object-cover " src="/img/veterinary.jpg" alt="Image veterinary" />
      </div>
      <div className=" p-10 grid grid-rows-4 ">

        <div className="row-span-1 text-5xl font-extrabold text-center text-cyan-500">Reset Password and Don't Lose Your <span className="text-black">Patients</span> </div>

        <div className="row-span-2 flex flex-col items-center justify-center">
          {msg && <Alert alert={alert} />}
          <form className="w-full" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email"
                className="font-bold text-gray-500 text-xl block">
                Email
              </label>
              <input id="email" type="email"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="Email" autoComplete="username"
                onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mt-5">
              <input type="submit"
                className="uppercase font-extrabold bg-cyan-500 hover:bg-cyan-700 p-4 
                w-full rounded-xl text-white mb-1"
                value="Send Instructions" />
            </div>

            <nav className="mt-2 lg:flex lg:justify-between">
              <p className="text-gray-500 block text-center">
                I have an account {""}
                <Link to="/" className="text-cyan-600">Login! </Link></p>

              <p className="text-gray-500 block text-center">
                Don't have an account? {""}
                <Link to="/register" className="text-cyan-600">Register </Link></p>
            </nav>

          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;