import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const {logOut} = useAuth()

    return (
        <header className="bg-gradient-to-t from-cyan-400 to-cyan-600 px-10 py-6 flex justify-between items-center flex-col md:flex-row">
            <div>
                <h1
                    className="font-bold text-cyan-700 text-2xl text-center"
                >
                    Veterinary Patients <span className="text-cyan-900">Manager</span></h1>
            </div>
            <nav className=" md:mt-0 mt-5 flex flex-col md:flex-row md:gap-5 ">
                <Link to={"/admin"} className="font-bold text-white uppercase text-center">Patients</Link>
                <Link to={"/admin/profile"} className="font-bold text-white uppercase text-center">Profile</Link>
                <button 
                    className="font-bold text-white uppercase text-center"
                    onClick={logOut}>
                    Sign Out
                </button>
            </nav>
        </header>
    )
}

export default Header