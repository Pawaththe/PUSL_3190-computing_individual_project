import DropdownOption from "@/app/learndashboard/_components/DropdownOption";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { HiEllipsisVertical } from "react-icons/hi2";

function InterviewItemCard({interview,refreshData,displayUser=false}) {

    const router = useRouter();

    const onStart = () => {
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }

    const handleOnDelete = async() => {
        const resp = await db.delete(MockInterview)
        .where(eq(MockInterview.mockId,interview?.mockId))
        .returning({id:MockInterview?.mockId})

        if(resp){
            refreshData();
        }
        
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>

        <h2 className='font-bold text-primary flex justify-between items-center'>{interview?.jobPostion}
        {!displayUser && (
            <DropdownOption handleOnDelete={() => handleOnDelete()}>
            <HiEllipsisVertical />
            </DropdownOption>
        )}
        </h2>
        <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-600'>Created at: {interview.createdAt}</h2>

        <div className='flex justify-between mt-2 gap-5'>

            <Button size='sm' variant='outline' className='w-full'
                onClick = {onFeedbackPress}>Feedback</Button>
            <Button size='sm' className='w-full'
                onClick = {onStart}
            >Start</Button>
        </div>
      
    </div>
  )
}

export default InterviewItemCard
