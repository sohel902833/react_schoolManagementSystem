import { ref, getDatabase } from "firebase/database";
import "../../firebase";
const db = getDatabase();

export const CLASS_REF_NAME = "CollageManagement/ClassList";
export const BATCH_REF_NAME = "CollageManagement/Batches";
export const ROOT_API_REF_NAME = "CollageManagement";
export const STUDENT_REF_NAME = "CollageManagement/Student";
export const TEACHER_REF_NAME = "CollageManagement/Teachers";
export const NOTICE_REF_NAME = "CollageManagement/Notice";
export const BASIC_INFO_REF_NAME = "CollageManagement/BasicInfo";
export const SLIDER_IMAGE_REF_NAME = "CollageManagement/SliderImage";
export const ONLINE_ADMIT_REF_NAME = "CollageManagement/OnlineAdmit";
export const CONTACT_REF_NAME = "CollageManagement/Contact";
export const ACTIVITY_REF_NAME = "CollageManagement/Activities";
export const RESULT_SHIT_REF_NAME = "CollageManagement/ResultShit";
export const RESULT_REF_NAME = "CollageManagement/Results";

export const studentsRef: any = ref(db, "CollageManagement/Student");
export const homeRef: any = ref(db, "CollageManagement/Main");
export const teacherRef: any = ref(db, "CollageManagement/Teachers");
export const noticeRef: any = ref(db, "CollageManagement/Notice");
export const departmentRef: any = ref(db, "CollageManagement/Department");
export const batchRef: any = ref(db, BATCH_REF_NAME);
export const resultShitRef: any = ref(db, "CollageManagement/ResultShit");
export const resultRef: any = ref(db, "CollageManagement/Result");
export const classRef: any = ref(db, CLASS_REF_NAME);
