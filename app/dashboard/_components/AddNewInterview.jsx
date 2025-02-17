'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function AddNewInterview() {

    const [openDialog, setopenDialog] = useState(false);
    const [jobPosition, setjobPosition] = useState();
    const [jobDesc, setjobDesc] = useState();
    const [jobExperience, setjobExperience] = useState();
    const [loading,setloading] = useState(false);
    const [jsonResponse, setjsonResponse] = useState([]);

    const onSubmit = async(e) => {
        setloading(true)
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+" Depends on Job Position., Job Description and Years of Experience provide "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answers in JSON format. Provide questions and answers field on JSON."
        
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','');
        console.log(JSON.parse(MockJsonResp));
        setjsonResponse(MockJsonResp);
        setloading(false);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setopenDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>

        <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className= 'text-2xl'>Tell us more about job you are interviewing</DialogTitle>
            <DialogDescription>

                <form onSubmit={onSubmit}>

                    <div>
                        <h2>Add details about your job position/role, job description and years of experience</h2>

                        <div className='mt-7 my-3'>
                            <label>Job Position/Job Role</label>
                            <Input placeholder="Ex. Full Stack Developer" required
                            onChange = {(event)=>setjobPosition(event.target.value)}
                            />
                        </div>

                        <div className='my-3'>
                            <label>Job Description / Tech Stack(In Short)</label>
                            <Textarea placeholder="Ex. React, Angular, NodeJS, Java" required
                            onChange = {(event)=>setjobDesc(event.target.value)}
                            />
                        </div>

                        <div className='my-3'>
                            <label>Years of experience</label>
                            <Input placeholder="Ex. 2" type="number" max="50" required
                            onChange = {(event)=>setjobExperience(event.target.value)}
                            />
                        </div>

                    </div>
                    
                    <div className='flex gap-5 justify-end'>
                        <Button type="button" variant="ghost" onClick={()=>setopenDialog(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {
                                loading?
                                <>
                                <LoaderCircle className='animate-spin'/> 'Generating from AI'
                                </>:'Start Interview'
                            }
                            </Button>
                    </div>

                </form>

            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview
