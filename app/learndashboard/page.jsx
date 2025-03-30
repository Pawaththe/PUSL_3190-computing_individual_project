import AddCourse from "./_components/AddCourse"
import UserCourseList from "./_components/UserCourseList"


function learnDashboard() {
  return (
    <div>
        <AddCourse/>

        {/* Display List of Courses */}
        <UserCourseList/>

    </div>
  )
}

export default learnDashboard
