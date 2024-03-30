import Http from "@absensi/utils/fetch";

const adminService = {
  getAttendance() {
    return Http.get("attendances");
  },
  postAttendance(payload: any) {
    return Http.post("attendance", payload);
  },
  //class
  getClass() {
    return Http.get("class");
  },
  updateClass(id: number, payload: any) {
    return Http.put(`class/${id}`, payload);
  },
  deleteClass(id: number) {
    return Http.delete(`class/${id}`);
  },
  postClass(payload: any) {
    return Http.post("class", payload);
  },
  //student
  getStudents() {
    return Http.get("students");
  },
  postStudent(payload: any) {
    return Http.post("student", payload);
  },
  postUploadStudent(payload: any) {
    return Http.post("student/import-excel", payload);
  },
  getStudentByClassName(id: string, fk_lesson: string) {
    return Http.get(`student/${id}/${fk_lesson}`);
  },
  updateStudent(id: number, payload: any) {
    return Http.put(`student/${id}`, payload);
  },
  deleteStudent(id: number) {
    return Http.delete(`student/${id}`);
  },

  //teacher
  getTeacher() {
    return Http.get("teachers");
  },
  getTeacherById(id: number) {
    return Http.get(`teacher/${id}`);
  },
  postTeacher(payload: any) {
    return Http.post("teacher", payload);
  },
  updateTeacher(id: number, payload: any) {
    return Http.put(`teacher/${id}`, payload);
  },
  deleteTeacher(id: number) {
    return Http.delete(`teacher/${id}`);
  },
  //user
  getUser() {
    return Http.get("users");
  },
  //subject
  getSubject() {
    return Http.get("subjects");
  },
  postSubjects(payload: any) {
    return Http.post("subject", payload);
  },
  deleteSubject(id: number) {
    return Http.delete(`subject/${id}`);
  },
  updateSubject(id: number, payload: any) {
    return Http.put(`subject/${id}`, payload);
  },
  //scheduler
  getScheduler() {
    return Http.get("lesson-schedules");
  },
  postScheduler(payload: any) {
    return Http.post("lesson-schedule", payload);
  },
  updateScheduler(id: number, payload: any) {
    return Http.put(`lesson-schedule/${id}`, payload);
  },
  deleteScheduler(id: number) {
    return Http.delete(`/lesson-schedule/${id}`);
  },
};

export default adminService;
