import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

function CourseBasicInfo({course}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='font-bold text-3xl'>{course?.courseOutput?.['Course Name']} <EditCourseBasicInfo course={course} /></h2>
                <p className='text-sm text-gray-500 mt-3'>{course?.courseOutput?.Description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.category}</h2>
                <Button className='w-full mt-5'>Start</Button>
            </div>
            <div>
                <Image src={'/online.png'} width={300} height={300} className='w-full rounded-xl h-[250px] object-contain bg-blue-100'/>
            </div>
        </div>
    </div>
  )
}

export default CourseBasicInfo
