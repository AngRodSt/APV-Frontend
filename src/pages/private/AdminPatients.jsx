import Form from "../../components/Form";
import PatientsList from "../../components/PatientsList";

const AdminPatients = () => {

  return (
    
    <main className="flex md:flex-row flex-col mt-10 gap-5 px-10 flex-grow overflow-auto">
        {<Form />}
        {<PatientsList/>}
    </main>
  )
}

export default AdminPatients