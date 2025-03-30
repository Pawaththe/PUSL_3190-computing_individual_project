import { Button } from "@/components/ui/button";
import { storage } from "@/configs/firebaseConfig";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

function CourseBasicInfo({course,refreshData}) {

  const [selectedFile, setSelectedFile] = useState();

  // Select rhe file and upload to firebase storage

  const onFileSelected = async(event) => {
      const file = event.target.files[0];
      // console.log(file);
      setSelectedFile(URL.createObjectURL(file));

      const fileName = Date.now() + '.jpg';

      const storageRef = ref(storage,'ai-course/'+fileName)

      await uploadBytes(storageRef,file).then((snapshot) => {
        console.log("File uploaded successfully!");
      }).then(resp =>{
        getDownloadURL(storageRef).then(async(downloadURL) => {
          console.log(downloadURL);
          
          await db.update(CourseList).set({
            courseBanner:downloadURL
          }).where(eq(CourseList.id,course?.id))
        })
      })
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='font-bold text-3xl'>{course?.courseOutput?.['Course Name']} <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/></h2>
                <p className='text-sm text-gray-500 mt-3'>{course?.courseOutput?.Description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.category}</h2>
                <Button className='w-full mt-5'>Start</Button>
            </div>
            <div>
              <label htmlFor='upload-image'>
                  <Image src={selectedFile?selectedFile:'/online.png'} width={300} height={300} className='w-full rounded-xl h-[250px] object-contain bg-blue-100 cursor-pointer'/>
              </label>
                <input type='file' id="upload-image" className='opacity-0' onChange={onFileSelected}/>
            </div>
        </div>
    </div>
  )
}

export default CourseBasicInfo
