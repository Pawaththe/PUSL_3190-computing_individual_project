import Image from 'next/image'

function CourseCard({course}) {
  return (
    <div>
        <Image src={'/online.png'} width={300} height={200}
        className='w-full h-[200px]'/>
    </div>
  )
}

export default CourseCard
