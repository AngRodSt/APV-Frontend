import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axios";

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const [validToken, setValidToken] = useState(false)
    const [passwordSaved, setPasswordSaved] = useState(false)

    const params = useParams();
    const { token } = params;
    console.log(token)

    useEffect(() => {
        const authToken = async ()=>{
            try {
                await axiosClient(`/veterinarian/reset-password/${token}`);
                setAlert({
                    msg: 'Enter your new password'
                })
                setValidToken(true)
            } catch (error) {
                setAlert({
                    msg:'There was an error in the link',
                    error:true
                })
            }
        }
        authToken()

    }, [])


    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6){
            setAlert({ msg: "The password is too short", error: true })
            return;
        }

        try {
            const url = `/veterinarian/reset-password/${token}`
            await axiosClient.post(url, {password})
            setAlert({msg: "Password updated successfully"});
            setPasswordSaved(true)
            setPassword('')

            
        } catch (error) {
            setAlert({
                msg: "There was an error in the link",
                error: true
            })
        }
        
    }


    const { msg } = alert;

    return (
        <>
            <div className="hidden md:block overflow-hidden">
                <img className="w-full h-full object-cover " src="/img/veterinary.jpg" alt="Image veterinary" />
            </div>
            <div className=" p-10 grid grid-rows-4 ">

                <div className="row-span-1 text-5xl font-extrabold text-center text-cyan-500">Update Your Password and Don't Lose Your <span className="text-black">Patients</span> </div>

                <div className="row-span-2 flex flex-col items-center justify-center">
                    {msg && <Alert alert={alert} />}
                    {validToken && (
                        <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="password"
                                className="font-bold text-gray-500 text-xl block">
                                New Password
                            </label>
                            <input id="password" type="password"
                                className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                                placeholder="New Password" autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mt-5">
                            <input type="submit"
                                className="uppercase font-extrabold bg-cyan-500 hover:bg-cyan-700 p-4 
                                 w-full rounded-xl text-white mb-1"
                                value="Save new password" />
                        </div>
                        {passwordSaved && (
                            <nav className="mt-2 lg:flex lg:justify-between">
                            <p className="text-gray-500 block text-center">
                                Keeping On and {""}
                                <Link to="/" className="text-cyan-600">Login! </Link></p>
                        </nav>
                        )}
                        
                    </form>
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default NewPassword