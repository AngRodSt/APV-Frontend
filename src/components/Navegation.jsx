import ProfileForm from "./ProfileForm"
import ChangePsw from "./ChangePsw"
import { useState } from "react"

const Navegation = () => {

    const [editProfile, setEditProfile] = useState(true)
    const [updatePassword, setUpdatePassword] = useState(false)

    return (
        <>
            <nav className="flex gap-3 font-bold container mx-auto justify-between  mb-10 bg-gradient-to-b from-cyan-400 to-gray-100 p-4 lg:w-1/2 w-full sm:flex-row flex-col rounded-md">
                <button className={`${editProfile? 'text-cyan-950' : 'text-white'} uppercase text-shadow-md `}
                    value={editProfile}
                    onClick={
                        () => {
                            setEditProfile(true);
                            setUpdatePassword(false);
                        }
                    }
                >Edit Profile</button>
                <button className={`${updatePassword? 'text-cyan-950' : 'text-white'} uppercase text-shadow-md`}
                    value={updatePassword}
                    onClick={
                        () => {
                            setUpdatePassword(true);
                            setEditProfile(false);
                        }
                    }
                >Update Password</button>

            </nav>
            {editProfile ? <ProfileForm /> : <ChangePsw />}

        </>
    )
}

export default Navegation