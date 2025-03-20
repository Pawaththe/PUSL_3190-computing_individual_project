import Header from "../dashboard/_components/Header"

function LearnDashboardLayout({children}) {
  return (
    <div>

      <Header/> 

      <div className = 'mx-5 md:mx-20 lg:mx-36'>
        <div className="p-10">
            {children}
        </div>
      </div>

      
    </div>
  )
}

export default LearnDashboardLayout
