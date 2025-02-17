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
import { useState } from "react";

function AddNewInterview() {

    const [openDialog, setopenDialog] = useState(false);
    const [jobPosition, setjobPosition] = useState();
    const [jobDesc, setjobDesc] = useState();
    const [jobExperience, setjobExperience] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);
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
                        <Button type="submit">Start Interview</Button>
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
