'use client'

import { Button } from "@/components/ui/button"
import { GenerateChapterContent_AI } from "@/configs/AiModel"
import service from "@/configs/service"
import { db } from "@/utils/db"
import { Chapters, CourseList } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingDialog from "../_components/LoadingDialog"
import ChapterList from "./_components/ChapterList"
import CourseBasicInfo from "./_components/CourseBasicInfo"
import CourseDetails from "./_components/CourseDetails"

function CourseLayout({params}) {

    const {user} = useUser();
    const [course,setcourse] = useState([]);
    const [loading,setLoading] = useState(false);
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

    const GenerateChapterContent = ()=>{
      setLoading(true);
      const chapters = course?.courseOutput?.Chapters;
      chapters.forEach(async(chapter,index)=>{

        const PROMPT = 'Explain the concept in detail on Topic:'+course?.name+' , Chapter: '+chapter?.['Chapter Name']+', in JSON format with list of array with field as title, explanation on give chapter in detail, Code examples (Code field in <precode> format) if applicable.';
        console.log(PROMPT);
        if(index<3){

          try{

            let videoId= '';

             //Generate Video URL
              service.getVideos(course?.name+':'+chapter?.['Chapter Name']).then(resp=>{
              console.log(resp);
              videoId = resp[0]?.id?.videoId;
          })

            //Generate Chapter Content
            const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
            console.log(result?.response?.text());
            const content = JSON.parse(result?.response?.text());

            //Save Chapter Content + Video URL
            await db.insert(Chapters).values({
              chapterId:index,
              courseId:course?.courseId,
              content:content,
              videoId:videoId
            })

            setLoading(false);

          }catch(e){
            
            setLoading(false);
            console.log(e);
          }

          router.replace('/create-course/'+course?.courseId+'/finish')
        }
    })
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>

        <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

        <LoadingDialog loading={loading}/>

        {/* Basic Info */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>

        {/* Course Details */}
        <CourseDetails course={course}/>

        {/* List of Lessons */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>

        <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>    

    </div>
  )
}

export default CourseLayout
