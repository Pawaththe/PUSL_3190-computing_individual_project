import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";

function SelectOption() {

      const {userCourseInput, setuserCourseInput} = useContext(UserInputContext);
    
      const handleInputChange = (fieldName,value)=>{
    
            setuserCourseInput(prev =>({
    
                ...prev,
                [fieldName]:value
            }))
      }

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        
        <div>
          <label className="text-sm">📍 Difficulty level</label>
          <Select onValueChange={(value)=>handleInputChange('level',value)}
            defaultValue={userCourseInput?.level}>
            <SelectTrigger className='h-14 text-lg'>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">🕐 Course Duration</label>
          <Select
          defaultValue={userCourseInput?.duration}
          onValueChange={(value)=>handleInputChange('duration',value)}>
            <SelectTrigger className='h-14 text-lg'>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hour">2 Hour</SelectItem>
              <SelectItem value="3 Hour">3 Hour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">▶️ Add Tutorial Videos</label>
          <Select
          defaultValue={userCourseInput?.displayVideo}
          onValueChange={(value)=>handleInputChange('displayVideo',value)}>
            <SelectTrigger className='h-14 text-lg'>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
            <label className='text-sm'>📒 No of Chapters</label>
            <Input type="number" className='h-14 text-lg'
            defaultValue={userCourseInput?.noOfChapters}
            onChange={(event)=>handleInputChange('noOfChapters',event.target.value)}
            />

        </div>

      </div>
    </div>
  );
}

export default SelectOption;
