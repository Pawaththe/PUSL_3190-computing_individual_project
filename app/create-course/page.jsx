'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HiMiniSquare3Stack3D, HiPencilSquare, HiSquaresPlus } from "react-icons/hi2";
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

    const [activeIndex,setactiveIndex] = useState(0);

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

            {activeIndex < 2 && <Button onClick = {()=>setactiveIndex(activeIndex+1)}>Next</Button>}

            {activeIndex == 2 && <Button onClick = {()=>setactiveIndex(activeIndex+1)}>Generate Course Layout</Button>}
        
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
