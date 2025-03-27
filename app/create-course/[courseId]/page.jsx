'use client'

import { db } from "@/utils/db"
import { CourseList } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import ChapterList from "./_components/ChapterList"
import CourseBasicInfo from "./_components/CourseBasicInfo"
import CourseDetails from "./_components/CourseDetails"

function CourseLayout({params}) {

    const {user} = useUser();
    const [course,setcourse] = useState([]);

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
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

        {/* Basic Info */}
        <CourseBasicInfo course={course}/>

        {/* Course Details */}
        <CourseDetails course={course}/>

        {/* List of Lessons */}
        <ChapterList course={course}/>

    </div>
  )
}

export default CourseLayout
