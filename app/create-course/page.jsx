'use client'

import { Button } from "@/components/ui/button";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import { useContext, useEffect, useState } from "react";
import { HiMiniSquare3Stack3D, HiPencilSquare, HiSquaresPlus } from "react-icons/hi2";
import { UserInputContext } from "../_context/UserInputContext";
import LoadingDialog from "./_components/LoadingDialog";
import SelectCategory from "./_components/SelectCategory";
import SelectOption from "./_components/SelectOption";
import TopicDescription from "./_components/TopicDescription";

function CreateCourse() {

    const StepperOptions = [
        {
            id:1,
            name:'Category',
            icon:<HiMiniSquare3Stack3D />
        },
        {
            id:2,
            name:'Options',
            icon:<HiSquaresPlus />
        },
        {
            id:3,
            name:'Topic & Desc',
            icon:<HiPencilSquare />
        },
    ]

    const {userCourseInput, setuserCourseInput} = useContext(UserInputContext);

    const [loading,setloading] = useState(false);
    
    const [activeIndex,setactiveIndex] = useState(0);

    useEffect(()=>{
        console.log(userCourseInput);
    },[userCourseInput])


    // Used to check, Next button Enabled or Disabled status

    const checkStatus = () => {
        if(userCourseInput?.length == 0){
            return true;
        }

        if(activeIndex==0 && (userCourseInput?.category?.length==0 || userCourseInput?.category==undefined)){
            return true;
        }
        if(activeIndex==1 && (userCourseInput?.topic?.length==0 || userCourseInput?.topic==undefined)){
            return true;
        }
        else if(activeIndex==2 && (userCourseInput?.level == undefined || userCourseInput?.duration==undefined||userCourseInput?.displayVideo==undefined||userCourseInput?.noOfChapters==undefined)){
            return true;
        }
        return false;
    }

    const GenerateCourseLayout = async() => {
        
        setloading(true);
        const BASIC_PROMPT = 'Generate a course tutorial on following details with field as Course name, Description, along with chapter name and duration.';
        const USER_INPUT_PROMPT = 'Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Level: '+userCourseInput?.level+', Duration: '+userCourseInput?.duration+', No of Chapters: '+userCourseInput?.noOfChapters+' in JSON format.';
        const FINAL_PROMPT = BASIC_PROMPT+USER_INPUT_PROMPT;
        console.log(FINAL_PROMPT);

        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log(result.response?.text());
        console.log(JSON.parse(result.response?.text()))
        setloading(false);

    }


return (
    <div>
      
      {/* Steps */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-3xl text-primary font-bold'>Create Course</h2>

        <div className='flex mt-10'>
            {StepperOptions.map((item,index) => (
                <div className='flex items-center'>
                    <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                        <div className= {`bg-gray-400 p-5 rounded-full text-white text-3xl ${activeIndex>=index && 'bg-primary'}`}>
                            {item.icon}
                        </div>
                        <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                    </div>
                    {index!=StepperOptions?.length-1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex-1>=index && 'bg-primary'}`}>
                    </div>}
                </div>
            ))}

        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>

      {/* components */}

            {activeIndex == 0? <SelectCategory/>:
            activeIndex == 1? <TopicDescription/>:
            <SelectOption/>}

      {/* Next & Previous Buttons */}

        <div className='flex justify-between mt-10'> 

            <Button disabled = {activeIndex == 0} onClick = {()=> setactiveIndex(activeIndex-1)}>Previous</Button>

            {activeIndex < 2 && <Button disabled = {checkStatus()} onClick = {()=>setactiveIndex(activeIndex+1)}>Next</Button>}

            {activeIndex == 2 && <Button disabled = {checkStatus()} onClick = {()=> GenerateCourseLayout()}>Generate Course Layout</Button>}
        
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse
