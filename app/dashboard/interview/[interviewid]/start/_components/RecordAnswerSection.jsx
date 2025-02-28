'use client'
import { Button } from '@/components/ui/button';
import { db } from "@/utils/db";
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic, StopCircle } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';


function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {

    const [userAnswer,setuserAnswer] = useState('');
    const {user} = useUser();
    const [loading,setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result)=>(
            setuserAnswer(prevAns=>prevAns+result?.transcript)
        ))

    },[results])

    useEffect(() => {
        if(!isRecording && userAnswer.length>10){
            UpdateUserAnswer();
        }
    },[userAnswer])


    const StartStopRecording = async () => {

        if(isRecording){

            stopSpeechToText()
        }
        else{
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async() => {

        console.log(userAnswer)
        setLoading(true)

        const feedbackPrompt = "Question: "+ mockInterviewQuestion[activeQuestionIndex]?.question+
            ", User Answer: "+ userAnswer + ", depends on question and user answer for interview question "+
            "please give us rating for answer and feedback as area of improvement if any"+
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

            const result = await chatSession.sendMessage(feedbackPrompt);

            const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');

            console.log(mockJsonResp);

            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(UserAnswer)
            .values({
                    mockIdRef:interviewData?.mockId,
                    question:mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns:userAnswer,
                    feedback:JsonFeedbackResp?.feedback,
                    rating:JsonFeedbackResp?.rating,
                    userEmail:user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }) 

            if(resp){
                toast('User answer recorded successfully')
            }
            setLoading(false);
    }

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>

            <Image src={'/webcam.png'} width={200} height={200} className='absolute'/>  

            <Webcam
                mirrored={true}
                style={{
                    height:300,
                    width:'100%',
                    zIndex:10
                }} />
        </div>

        <Button
        disabled={loading}
        variant = "outline" className= "my-10"
        
            onClick={StartStopRecording}
        >

            {isRecording?
            <h2 className='text-red-700 flex gap-2 animate-pulse items-center'>
                <StopCircle /> Stop Recording
            </h2>
            :
            <h2 className='text-primary flex gap-2 items-center'><Mic/> Record Answer </h2>}
            
            </Button>

            <Button onClick = {()=>console.log(userAnswer)}>Show User Answer</Button>

    </div>
    
  )
}

export default RecordAnswerSection
