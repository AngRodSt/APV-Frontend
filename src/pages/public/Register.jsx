import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../config/axios";
import Alert from "../../components/Alert";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({})
  const [charging, setCharging] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "All fields are mandatory", error: true })
      return;
    }
    if (password !== repeatPassword) {
      setAlert({ msg: "Passwords are different", error: true })
      return;
    }
    if (password.length < 6) {
      setAlert({ msg: "The password is too short", error: true })
      return;
    }

    setAlert({})

    try {
      setCharging(true)
      await axiosClient.post('/veterinarian', { name, email, password })
      setAlert({ msg: "User created successfully! Verify email", error: false })

    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }

    setCharging(false)
  }
  const { msg } = alert

  return (
    <>
      <div className="hidden md:block overflow-hidden">
        <img className="w-full h-full object-cover " src="/img/veterinary.jpg" alt="Image veterinary" />
      </div>
      <div className=" p-10 grid grid-rows-3 ">
        <div className="row-span-1  text-cyan-500 
        my-auto md:my-0 "> <h1 className="text-5xl font-extrabold text-center">Register and Manage your {""} <span className="text-black">Patients</span> </h1>
          {msg && <Alert alert={alert} />}
        </div>

        <div className="row-span-2 flex flex-col  items-center justify-center">

          <form onSubmit={handleSubmit} className="w-full" >
            <div>
              <label htmlFor="name"
                className="font-bold text-gray-500 text-xl block">
                Name
              </label>
              <input id="name" type="text"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="Your name" autoComplete="username"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email"
                className="font-bold text-gray-500 text-xl block">
                Email
              </label>
              <input id="email" type="email"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="exp. correo@correo.com" autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password"
                className="font-bold text-gray-500 text-xl block">
                Password
              </label>
              <input id="password" type="password"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="Password" autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="confirm-password"
                className="font-bold text-gray-500 text-xl block">
                Repeat Password
              </label>
              <input id="confirm-password" type="password"
                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                placeholder="Repeat Password" autoComplete="current-password"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              />
            </div>
            <div className={`${charging? "flex" : " hidden" } items-center flex-col justify-center  mt-10`}>
              <span className="loader"></span>
            </div>
            <div className="mt-5">
              <button type="submit"
                className={`${charging? "cursor-not-allowed bg-gray-300 pointer-events-none" : "bg-cyan-500 hover:bg-cyan-700 "} uppercase font-extrabold p-4 w-full rounded-xl text-white mb-1 `}>
                Create Account </button>
            </div>

            <nav className="mt-2 lg:flex lg:justify-between">
              <p className="text-gray-500 block text-center">
                I have an account {""}
                <Link to="/" className="text-cyan-600">Login! </Link></p>
            </nav>

          </form>

        </div>
      </div>
    </>
  )
}

export default Register;