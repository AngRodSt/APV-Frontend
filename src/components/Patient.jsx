import { useState } from "react";
import usePatients from "../hooks/usePatients";
import Card from "./Card";


const Patient = ({ patient }) => {
    const { name, owner, email, date, symptoms, _id } = patient
    const {editPatient, deletePatient} = usePatients()
    const [isOpen, setIsOpen] = useState(false)

    const formatDate = (date) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(newDate)
    }
    

    return (
        <>
            <div className="bg-white px-4 py-10 mb-2 rounded shadow-lg">
                <p className=" text-center uppercase font-bold text-cyan-900 text-2xl mb-5">{name}</p>
                <p className="font-bold text-cyan-700 mb-2 uppercase">Pet Owner: <span className="font-normal normal-case text-black">{owner}</span></p>
                <p className="font-bold text-cyan-700 mb-2 uppercase">Owner email: <span className="font-normal normal-case text-black">{email}</span></p>
                <p className="font-bold text-cyan-700 mb-2 uppercase">Discharge date <span className="font-normal normal-case text-black">{formatDate(date)}</span></p>
                <p className="font-bold text-cyan-700 mb-2 uppercase">Symptoms: <span className="font-normal normal-case text-black">{symptoms}</span></p>

                <div className="flex justify-between flex-col sm:flex-row gap-3 mt-10">
                    <button className="bg-cyan-700 hover:bg-cyan-800 uppercase text-white font-bold px-10 py-2 rounded-md"
                    onClick={()=> editPatient(patient)}
                    >Edit</button>
                    <button className="bg-red-600 hover:bg-red-700 uppercase text-white font-bold px-10 py-2 rounded-md"
                    onClick={()=> { 
                        setIsOpen(true)
                    }}
                    >Delete</button>
                </div>
                {isOpen && <Card onClose={() => setIsOpen(false)} onConfirmDelete={() => deletePatient(_id)}/>}
            </div>
        </>
    )
}

export default Patient