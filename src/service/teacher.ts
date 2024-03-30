import Http from "@absensi/utils/fetch"

const teacherService = {
    getLesson() {
        return Http.get('lesson-schedules-user')
    },
    getLessonTeacher() {
        return Http.get('teacher-lesson')
    }
}

export default teacherService;