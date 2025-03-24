import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function TopicDescription() {
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic */}
        <div className='mt-5'>
            <label>👨‍💻 Provide the topic for which you want to generate a course (Ex: Algorithms and Data Structures, Object Oriented Programming, etc.): </label>
            <Input placeholder = {'Topic'}/>
        </div>

        <div className='mt-5'>
            <label>🔗 Explain more about your course, What you want to include in the course</label>
            <Textarea placeholder = 'About your course'/>
        </div>
        {/* Text Area Desc */}
    </div>
  )
}

export default TopicDescription
