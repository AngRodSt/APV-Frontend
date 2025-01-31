import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateLayout = () => {

    const { auth, charging } = useAuth();
    if (charging) return 'Charging...'


    return (
        <>
            <main className=" flex flex-col min-h-screen overflow-hidden">
                <Header />
                {auth?._id ?? false ? <Outlet /> : <Navigate to="/" />}
                <Footer />
            </main>

        </>
    )
}

export default PrivateLayout