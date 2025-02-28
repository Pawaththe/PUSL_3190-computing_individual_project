'use client'

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

function StartInterview({params}) {

    const [interviewData, setinterviewData] = useState();
    const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
    const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

    useEffect(() =>{

        GetInterviewDetails();
    },[]);

    // used to get interview details by mockId/interviewId
    
    const GetInterviewDetails = async() => {
    
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewid))

        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp);
        setmockInterviewQuestion(jsonMockResp);
        setinterviewData(result[0]);
    
        }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

            {/* Questions */}

            <QuestionSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex = {activeQuestionIndex}
            />

            {/* Video / Audio Recording */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex = {activeQuestionIndex}
            interviewData = {interviewData}
            />

        </div>
    </div>
  )
}

export default StartInterview 
