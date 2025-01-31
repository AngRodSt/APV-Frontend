import usePatients from "../hooks/usePatients"
import Patient from "./Patient";

const PatientsList = () => {

    const { patients } = usePatients();

    return (
        <>
            <div className="lg:w-2/3 md:w-1/2 w-full">
                {patients.length ? (
                    <>
                        <h3 className="font-bold text-gray-700 text-4xl text-center">Patients List </h3>

                        <p className="mt-5 mb-10 text-center">Manage your {''} <span className="text-cyan-700 font-bold">Patients and Appointments</span></p>
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            {patients.map(patient => (
                                <Patient
                                    key={patient._id}
                                    patient={patient}
                                />
                            ))}
                        </div>


                    </>
                ) : (
                    <>
                        <h3 className="font-bold text-gray-700 text-xl text-center">No Patients</h3>

                        <p className="mt-5 mb-10 text-center">Add a New Patient and {''} <span className="text-cyan-700 font-bold">Start Managing Them</span></p>
                    </>
                )}
            </div>

        </>
    )
}

export default PatientsList