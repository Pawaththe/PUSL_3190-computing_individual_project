'use client'

import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import Header from '@/app/dashboard/_components/Header'
import { db } from '@/utils/db'
import { CourseList } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'

function Course({params}) {

    const [course,setcourse] = useState();

    useEffect(()=>{
        params && GetCourse();
    },[params])

    const GetCourse = async()=> {
        const result = await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))
        setcourse(result[0]);
        console.log(result);
    }

  return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44'>
            <CourseBasicInfo course={course} edit={false}/>

            <CourseDetails course={course} />

            <ChapterList course={course} edit={false}/>
        </div>
        
    </div>
  )
}

export default Course
