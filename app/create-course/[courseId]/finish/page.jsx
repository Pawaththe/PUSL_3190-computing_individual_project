'use client'

import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import CourseBasicInfo from "../_components/CourseBasicInfo";


function FinishScreen({params}) {

    const {user} = useUser();
    const [course,setcourse] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        params && GetCourse();

    },[params,user])

    const GetCourse = async() =>{
        const result = await db.select().from(CourseList)
        .where(and(eq(CourseList.courseId, params?.courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))

        setcourse(result[0]);
        console.log(result);
    }

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats! Your course is ready</h2>

      <CourseBasicInfo course={course} refreshData={()=>console.log()}/>

      <h2 className='mt-3 '>Course URL: </h2>
      <h2 className='text-center text-gray-400 border p-2 round flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
      <HiOutlineClipboardDocumentCheck className='h-5 w-5 cursor-pointer' onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + 'course/view/'+course?.courseId)}/>
      </h2>
 
    </div>
  )
}

export default FinishScreen
