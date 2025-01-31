import { Link, useParams } from "react-router-dom";
import { useDebugValue, useEffect, useState } from "react";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axios";

const AuthAccount = () => {
  const [alert, setAlert] = useState({})
  const [verified, setVerified] = useState(false);
  const [charging, setCharging] = useState(true);

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const authAccount = async () => {
      try {
        const url = `/veterinarian/confirm/${id}`
        const { data } = await axiosClient(url)
        console.log(data.url)
        setVerified(true)
        setAlert({ msg: data.url })

      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true })
      }
      setCharging(false)
    }
    authAccount()
  }, [])


  return (
    <>
      <main className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-2xl">

          <div
            className=" p-10 flex h-[900px]"
            style={{
              backgroundImage: "url(/img/confirmAccount.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>

            <div>
              <h1
                className="text-5xl font-extrabold text-center text-green-300 col-span-1">Verify Your Account And Start Manager Your {""}<span className="text-white">Patients</span>
              </h1>

              {!charging && <Alert alert={alert} />}

              <div className="mt-10">
                {verified && ( <Link to="/"
                    className="uppercase font-extrabold bg-green-300 shadow-lg hover:bg-green-400 p-4 w-full rounded-xl text-green-800 block text-center"
                  > Login! → </Link>
                )}
              </div>



            </div>




          </div >
        </div>
      </main>
    </>
  )
}


export default AuthAccount;