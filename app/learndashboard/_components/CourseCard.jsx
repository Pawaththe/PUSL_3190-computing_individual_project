import Image from 'next/image';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";


function CourseCard({course}) {
  return (
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer mt-4'>
        <Image src={course?.courseBanner} width={300} height={200}
        className='w-full h-[200px] object-cover rounded-lg'/>

        <div className='p-2'>
            <h2 className='font-medium text-lg'>{course?.courseOutput?.['Course Name']}</h2>

            <p className='text-sm text-gray-400 my-1'>{course?.category}</p>

            <div className='flex items:center justify-between'>
                <h2 className='flex gap-2 items-center p-1 bg-blue-50 text-primary text-sm rounded-sm'><HiOutlineClipboardDocumentList /> {course?.courseOutput?.['Number of Chapters']} Chapters</h2>
                <h2 className='text-sm bg-blue-50 text-primary p-1 rounded-sm'>{course?.level }</h2>
            </div>
        </div>

    </div>

  )
}

export default CourseCard
