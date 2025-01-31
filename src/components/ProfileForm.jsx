import { useState, useEffect } from "react"
import Alert from './Alert'
import useAuth from "../hooks/useAuth";

const ProfileForm = () => {

    const {auth, updateProfile} = useAuth();
    
    const [profile, setProfile] = useState({})
    const [alert, setAlert] = useState({})

    useEffect(()=>{
        setProfile(auth)
    },[auth])

    const handleSubmit = async e => {
        e.preventDefault()
        const {name, email} = profile
        if([name, email].includes("")){
            setAlert({msg: "Name and Email are mandatory", error:true})
            return;
        }
        const result = await updateProfile(profile)
        setAlert(result)
        setTimeout(() => {
            setAlert({})
        }, 2000);
    }

    const {msg} = alert
   
    return (
        <>
            <h3 className="font-bold text-gray-700 text-3xl text-center">Edit Profile</h3>
            <p className="mt-2 mb-10 text-center">Update your Information {''} <span className="text-cyan-700 font-bold">Here!</span></p>
           
            <form
                onSubmit={handleSubmit}
                className="container lg:w-1/2 mx-auto w-full mt-5 bg-white p-4 rounded shadow-lg" >
                <div>
                    <label htmlFor="name"
                        className="font-bold text-gray-700 uppercase block">
                        Name
                    </label>
                    <input id="name" type="text"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        name="name"
                        placeholder="Your name"
                        value={profile.name || ""}
                        onChange={e => setProfile({
                            ...profile,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="web"
                        className="font-bold text-gray-700 uppercase block">
                        Web Site
                    </label>
                    <input id="web" type="text"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        placeholder="Web Site"
                        name="web"
                        value={profile.web || ""}
                        onChange={e => setProfile({
                            ...profile,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="telephone"
                        className="font-bold text-gray-700 uppercase block">
                        Telephone
                    </label>
                    <input id="telephone" type="tel"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        placeholder="Telephone"
                        name="telephone"
                        value={profile.telephone || ""}
                        onChange={e => setProfile({
                            ...profile,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="email"
                        className="font-bold text-gray-700 uppercase block">
                        Email
                    </label>
                    <input id="email" type="email"
                        className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                        placeholder="exp. correo@correo.com" autoComplete="username"
                        name="email"
                        value={profile.email || ""}
                        onChange={e => setProfile({
                            ...profile,
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

export default ProfileForm