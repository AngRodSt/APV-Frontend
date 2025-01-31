import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [charging, setCharging] = useState(true)

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setCharging(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/veterinarian/perfile', config)
                setAuth(data.veterinarian)

            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCharging(false);

        }
        authenticateUser()

    }, [])

    const logOut = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    const updateProfile = async(profile) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setCharging(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosClient.put(`/veterinarian/perfile/${profile._id}`, profile, config)
            return {
                msg: "Profile Updated Successufully"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const updatePassword = async(pswData)=> {
        const token = localStorage.getItem('token');

            if (!token) {
                setCharging(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const url = '/veterinarian/update-password'
                const {data} = await axiosClient.put(url, pswData, config)
                return {
                    msg: data.msg
                }
            } catch (error) {
                return {
                    msg:error.response.data.msg,
                    error:true
                }
            }


    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, charging, logOut, updateProfile, updatePassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext