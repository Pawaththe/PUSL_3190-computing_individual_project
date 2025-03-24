'use client'

import { useState } from "react";
import { UserInputContext } from "../_context/UserInputContext";
import Header from "../dashboard/_components/Header";

function CreateCourseLayout({children}) {

  const [userCourseInput, setuserCourseInput] = useState([]);

  return (
    <div>
      <UserInputContext.Provider value={{userCourseInput, setuserCourseInput}}>
        <>
        <Header/>  
        {children}
        </>
        
      </UserInputContext.Provider>
    </div>
  )
}

export default CreateCourseLayout
