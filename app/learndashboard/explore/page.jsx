'use client'

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

function Explore() {

    const [courseList, setcourseList] = useState([]);
    const [pageIndex, setpageIndex] = useState(0);

    useEffect(() => {
        GetAllCourse();
    },[pageIndex])

    const GetAllCourse = async() => {
        const result = await db.select().from(CourseList)
        .limit(9)
        .offset(pageIndex*9);
        setcourseList(result);
        console.log(result);
    }

  return (
    <div>
        <h2 className='font-bold text-2xl'>Explore more Projects</h2>
        <p>Explore more projects build with AI by other users </p>

        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
            {courseList?.map((course,index) => (
                <div>
                    <CourseCard course={course} displayUser={true} />
                </div>
            ))}
        </div>

        <div className='flex justify-between mt-5'>
            
            {pageIndex != 0 && <Button onClick = {() => setpageIndex(pageIndex-1)}>Previous Page</Button>}
            <Button onClick = {() => setpageIndex(pageIndex+1)}>Next Page</Button>

        </div>
    </div>
  )
}

export default Explore
