import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

function EditChapters({course,index,refreshData}) {

    const chapters = course?.courseOutput?.Chapters;
    const [name,setName] = useState();
    const [about,setAbout] = useState();

    useEffect(()=>{
        setName(chapters[index]?.['Chapter Name']);
        setAbout(chapters[index]?.Content)
    },[course])

    const onUpdateHandler = async() => {
        course.courseOutput.Chapters[index]['Chapter Name']= name;
        course.courseOutput.Chapters[index].Content = about;

        const result = await db.update(CourseList).set({
                courseOutput:course?.courseOutput
            }).where(eq(CourseList?.id,course?.id))
            .returning({id:CourseList.id})

            refreshData(true);
    }

  return (
    <Dialog>
        <DialogTrigger><HiOutlinePencilAlt /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Chapter</DialogTitle>
                <DialogDescription>
                    
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={chapters[index]?.['Chapter Name']}
                            onChange={(event)=>setName(event?.target.value)}
                            />
                        </div>

                        <div className='mt-3'>
                            <label>Description</label>
                            <Textarea className='h-40' defaultValue={chapters[index]?.Content}
                            onChange={(event)=>setAbout(event?.target.value)}
                            />
                        </div>

                </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
    </Dialog>

  )
}

export default EditChapters
