import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi";

function ChapterList({course}) {
  return (
    <div className='mt-3'>
        <h2 className='font-bold text-xl'>Chapters</h2>
        <div className='mt-2'>
            {course?.courseOutput?.Chapters.map((chapter,index)=>(
                <div className='border p-5 rounded-lg mb-3 flex items-center justify-between'>
                    <div className='flex gap-5 items-center'>
                        <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2'>{index+1}</h2>
                        <div>
                            <h2 className='font-medium text-lg'>{chapter?.['Chapter Name']}</h2>
                            <p className='text-sm text-gray-500'>{chapter?.Content}</p>
                            <p className='flex gap-2 text-primary items-center'> <HiOutlineClock /> {chapter?.Duration}</p>
                        </div>
                    </div>
                    <HiOutlineCheckCircle className='text-4xl text-gray-400 flex-none'/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList
