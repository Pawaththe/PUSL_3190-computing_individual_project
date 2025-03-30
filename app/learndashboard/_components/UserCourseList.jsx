'use client'

import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

function UserCourseList() {

  const {user} = useUser();
  const [courseList,setCourseList] = useState([]);

  useEffect(()=>{
    user && getUserCourses();
  },[user])

  const getUserCourses = async()=>{
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    // console.log(result);
    setCourseList(result);
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-xl'>My AI Courses</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {courseList?.map((course,index)=>(
            <CourseCard course={course} key={index}/>
        ))}
      </div>

    </div>
  )
}

export default UserCourseList
