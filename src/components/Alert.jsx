const Alert = ({alert}) => {
    
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-cyan-400 to-cyan-600'} bg-gradient-to-r
     w-full text-center p-3 text-white uppercase font-bold mb-3 rounded-lg shadow-md mt-10 `}>
        {alert.msg}
    </div>
  )
}

export default Alert