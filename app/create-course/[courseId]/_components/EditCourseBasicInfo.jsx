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


function EditCourseBasicInfo({course}) {

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(()=>{
        setName(course?.courseOutput?.['Course Name']);
        setDescription(course?.courseOutput?.Description);
  },[course])
  
  const onUpdateHandler = async()=> {
    course.courseOutput['Course Name'] = name;
    course.courseOutput.Description = description;

    const result = await db.update(CourseList).set({
        courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id))
    .returning({id:CourseList.id})

    console.log(result);
  }

  return (
        <Dialog>
            <DialogTrigger><HiOutlinePencilAlt /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>

                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={course?.courseOutput?.['Course Name']}
                            onChange={(event)=>setName(event?.target.value)}
                            />
                        </div>

                        <div className='mt-3'>
                            <label>Description</label>
                            <Textarea className='h-40' defaultValue={course?.courseOutput?.Description}
                            onChange={(event)=>setDescription(event?.target.value)}
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
export default EditCourseBasicInfo
