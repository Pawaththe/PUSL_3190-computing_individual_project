import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import { useContext } from "react";

function SelectCategory() {

  const {userCourseInput, setuserCourseInput} = useContext(UserInputContext);

  const handleCategoryChange = (category)=>{
        setuserCourseInput(prev => ({
            ...prev,
            category:category
        }))
  }

  return (

    <div className='px-10 md:px-20'>
      <h2 className='my-5'>Select the course category based on your type of Interview</h2>
      <div className='grid grid-cols-3 gap-10'>
        {CategoryList.map((item,index)=>(
            <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-100 cursor-pointer ${userCourseInput?.category == item.name && 'border-primary bg-blue-100'}`}
            onClick={()=>handleCategoryChange(item.name)}
            >
                <Image src={item.icon} width={100} height={100}/>
                <h2>{item.name}</h2>
            </div>
        ))}
      </div>
    </div>

    
  )
}

export default SelectCategory
