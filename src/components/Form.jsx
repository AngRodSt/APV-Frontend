import { useState, useEffect } from "react"
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";


const Form = () => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [symptoms, setSymptoms] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [id, setId] = useState(null)
    const [maxDate, setMaxDate] = useState("")

    const [alert, setAlert] = useState({})
    const [btnActive, setBtnActive] = useState(true)

    const { savePatient, patient, setPatient} = usePatients()

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMaxDate(today)
        if (patient?._id) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setSymptoms(patient.symptoms);
            const formattedDate = new Date(patient.date);
            const localDate = formattedDate.toISOString().split('T')[0]; // Sin modificar la zona horaria
            setDate(localDate);
            setId(patient._id)
        }

    }, [patient])

    const handleSubmit = e => {
        e.preventDefault();
        if ([name, owner, email, date, symptoms].includes("")) {
            setAlert({ msg: 'All field are mandatory', error: true })
            return;
        }
        setAlert({})
        savePatient({ name, owner, email, date, symptoms, id })
        
        setAlert({msg:"Saved Successfully"})
        setTimeout(() => {
            setAlert({})
            setName('');
            setOwner('');
            setEmail('');
            setSymptoms('');
            setDate(new Date().toISOString().split('T')[0]);
            setId(null);
            setPatient([])
            
        }, 1000);
        
    }

    const { msg } = alert

    return (
        <>
            <div className="lg:w-1/3 md:w-1/2 w-full">
                <h3 className="font-bold text-gray-700 text-4xl text-center ">Patients {""}<span className="text-cyan-700">Manager </span></h3>
                <p className="mt-5 mb-10 text-center">Add a New Patient and Start {''} <span className="text-cyan-700 font-bold"> Managing them</span></p>
                <div className="mt-5">
                    <button
                        className="block md:hidden uppercase font-extrabold bg-cyan-500 hover:bg-cyan-700 p-4 
                    w-full rounded-xl text-white mb-1"
                        value={btnActive}
                        onClick={() => setBtnActive(!btnActive)}>
                        {btnActive ? "Show Form" : "Hide Form"}
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={`${btnActive ? 'hidden' : 'block'} md:block w-full mt-5 bg-white p-4 rounded shadow-lg`} >
                    <div>
                        <label htmlFor="name"
                            className="font-bold text-gray-700 uppercase block">
                            Pet Name
                        </label>
                        <input id="name" type="text"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            placeholder="Your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="owner"
                            className="font-bold text-gray-700 uppercase block">
                            Pet Owner
                        </label>
                        <input id="owner" type="text"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            placeholder="Owner"
                            value={owner}
                            onChange={e => setOwner(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email"
                            className="font-bold text-gray-700 uppercase block">
                            Owner Email
                        </label>
                        <input id="email" type="email"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            placeholder="exp. correo@correo.com" autoComplete="username"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="date"
                            className="font-bold text-gray-700 uppercase block">
                            Discharge Date
                        </label>
                        <input id="date" type="date"
                            max={maxDate}
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="symptoms"
                            className="font-bold text-gray-700 uppercase block">
                            Symptoms
                        </label>
                        <textarea id="symptoms" type="text"
                            className="border p-3 mt-3 w-full bg-gray-50 rounded-lg"
                            value={symptoms}
                            onChange={e => setSymptoms(e.target.value)}
                        />
                    </div>

                    <div className="mt-5">
                        <input type="submit"
                            className="uppercase font-extrabold bg-cyan-500 hover:bg-cyan-700 p-4 
                w-full rounded-xl text-white mb-1"
                            value={id ? "Save Changes" : "Add Patient"} />
                    </div>
                    {msg && <Alert alert={alert} />}
                </form>

            </div>
        </>
    )
}

export default Form