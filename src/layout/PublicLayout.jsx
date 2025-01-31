import { Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <>
      <main className="flex items-center justify-center min-h-screen mx-5">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl">
        <Outlet />
      </div>
    </main >
    </>
  )
};

export default PublicLayout;