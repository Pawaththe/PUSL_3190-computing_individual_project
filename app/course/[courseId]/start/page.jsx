'use client'

import { db } from "@/utils/db"
import { Chapters, CourseList } from "@/utils/schema"
import { and, eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import ChapterContent from "./_components/ChapterContent"
import ChapterListCard from "./_components/ChapterListCard"

function CourseStart({params}) {

    const [course,setcourse] = useState();
    const [selectedChapter, setselectedChapter] = useState();
    const [chapterContent, setchapterContent] = useState();

    useEffect(() =>{
        GetCourse();
    },[])

    // Used to get course info by course id

    const GetCourse = async()=>{
        const result = await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))

        // console.log(result);
        setcourse(result[0]);
        GetSelectedChapterContent(0);
    }

    const GetSelectedChapterContent = async(chapterId) => {

        const result = await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)));

        setchapterContent(result[0]);
        console.log(result);
    }

  return (
    <div>
        {/* Chapter List Side Bar */}
        <div className='fixed md:w-64 hidden md:block h-screen border-r shadow-sm'>
          <h2 className='font-medium text-lg bg-primary p-4 text-white'>{course?.courseOutput?.['Course Name']}</h2> 

          <div>
            {course?.courseOutput?.Chapters.map((chapter,index) => (
              <div key={index} className={`cursor-pointer hover:bg-primary/10 ${selectedChapter?.['Chapter Name'] == chapter?.['Chapter Name'] && 'bg-primary/10'}`}
              onClick={() => {setselectedChapter(chapter);
                GetSelectedChapterContent(index)
              }}
              >
                  <ChapterListCard chapter={chapter} index={index}/>
              </div>
            ))}
          </div>

        </div>
        {/* Contenet Div */}
        <div className='md:ml-72'>
            <ChapterContent chapter={selectedChapter}
              content={chapterContent}
            />
        </div>
    </div>
  )
}

export default CourseStart