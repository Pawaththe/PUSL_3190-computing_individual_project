import { HiOutlineChartSquareBar, HiOutlineClock, HiOutlineDuplicate, HiOutlinePlay } from "react-icons/hi";

function CourseDetails({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>

            <div className='flex gap-2'>
                <HiOutlineChartSquareBar className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Skill Level</h2>
                    <h2 className='font-medium text-lg'>{course?.level}</h2>
                </div>
            </div>

            <div className='flex gap-2'>
                <HiOutlineClock className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Duration</h2>
                    <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
                </div>
            </div>

            <div className='flex gap-2'>
                <HiOutlineDuplicate className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-xs text-gray-500'>No of Chapters</h2>
                    <h2 className='font-medium text-lg'>{course?.courseOutput?.['Number of Chapters']}</h2>
                </div>
            </div>

            <div className='flex gap-2'>
                <HiOutlinePlay className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Video included?</h2>
                    <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CourseDetails
