import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";

function TopicDescription() {

  const {userCourseInput, setuserCourseInput} = useContext(UserInputContext);

  const handleInputChange = (fieldName,value)=>{

        setuserCourseInput(prev =>({

            ...prev,
            [fieldName]:value
        }))
  }

  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic */}
        <div className='mt-5'>
            <label>👨‍💻 Provide the topic for which you want to generate a course (Ex: Algorithms and Data Structures, Object Oriented Programming, etc.): </label>
            <Input placeholder = {'Topic'} className='h-14 text-xl'
            defaultValue = {userCourseInput?.topic}
            onChange={(e)=>handleInputChange('topic',e.target.value)}
            />
        </div>

        <div className='mt-5'>
            <label>🔗 Explain more about your course, What you want to include in the course</label>
            <Textarea placeholder = 'About your course' className='h-24 text-xl'
            defaultValue = {userCourseInput?.description}
            onChange={(e)=>handleInputChange('description',e.target.value)}
            />
        </div>
        {/* Text Area Desc */}
    </div>
  )
}

export default TopicDescription
