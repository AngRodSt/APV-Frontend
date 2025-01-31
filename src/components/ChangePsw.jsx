import { useState } from "react";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";

const ChangePsw = () => {

    const {updatePassword} = useAuth()

    const [password, setPassword] = useState({
        pwd_current: "",
        pwd_new: ""
    });
    const [alert, setAlert] = useState({});


    const handleSubmit = async e => {
        e.preventDefault()
        const { pwd_current, pwd_new } = password
        if ([pwd_current, pwd_new].includes("")) {
            setAlert({ msg: "All field are mandatory", error: true })
            return;
        }

        if (pwd_new.length < 6) {
            setAlert({ msg: "The new password is too short", error: true })
            return;
        }

        const result = await updatePassword(password)
        setAlert(result)
        setTimeout(() => {
            setAlert({})
        }, 2000);
        setPassword({
            pwd_current: "",
            pwd_new: ""
        })
    }

    const { msg } = alert


    return (
        <>
            <h3 className="font-bold text-gray-700 text-3xl text-center">Update Password</h3>
            <p className="mt-2 mb-10 text-center">Update your Password {''} <span className="text-cyan-700 font-bold">Here!</span></p>
            
            <form
                onSubmit={handleSubmit}
                className="container lg:w-1/2 mx-auto w-full mt-5 bg-white p-4 rounded shadow-lg" >
                <div>
                    <label htmlFor="currentPassword"
                        className="font-bold text-gray-700 uppercase block">
                        Current Password
                    </label>
                    <input id="currentPassword" type="password"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        autoComplete="password"
                        placeholder="Your Current Password"
                        name="pwd_current"
                        value={password.pwd_current || ""}
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="newPassword"
                        className="font-bold text-gray-700 uppercase block">
                        New Password
                    </label>
                    <input id="newPassword" type="password"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        autoComplete="password"
                        placeholder="Your new Password "
                        name="pwd_new"
                        value={password.pwd_new || ""}
                        onChange={e => setPassword({
                            ...password,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <div className="mt-5">
                    <input type="submit"
                        className="uppercase font-extrabold bg-cyan-500 hover:bg-cyan-700 p-4 w-full rounded-xl text-white mb-1"
                        value="Save Changes" />
                </div>
                {msg && <Alert alert={alert} />}

            </form>
        </>
    )
}

export default ChangePsw