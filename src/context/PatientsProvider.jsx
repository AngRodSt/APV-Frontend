import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export const PatientProvider = ({ children }) => {

    const {auth} = useAuth();
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState([])

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/patient', config)
                const patientsList = data.map(({ createdAt, updatedAt, __v, ...patient }) => patient);
                setPatients(patientsList)

            } catch (error) {
                console.log(error.response)
            }
        }
        getPatients();

    }, [auth])

    const savePatient = async (patient) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patient/${patient.id}`, patient, config)
                const { createdAt, updatedAt, __v, ...savedPatient } = data
                const updatePatients = patients.map(patient => patient._id === savedPatient._id ? savedPatient : patient)
                setPatients(updatePatients)
            } catch (error) {
                console.log(error.response.messege)
            }

        }
        else {
            try {
                const { data } = await axiosClient.post("/patient", patient, config)
                const { createdAt, updatedAt, __v, ...savedPatient } = data
                setPatients([savedPatient, ...patients])
            }
            catch (error) {
                console.log(error.response)
            }
        }

    }

    const editPatient = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async (id) => {
        const isConfirmed = window.confirm("Do you want to delete the patient?");
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                await axiosClient.delete(`/patient/${id}`, config)
                const updatePatients = patients.filter(patient => patient._id !== id)
                setPatients(updatePatients)
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
    }
    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                editPatient,
                patient,
                deletePatient
            }}
        >

            {children}

        </PatientsContext.Provider>)
}

export default PatientsContext;