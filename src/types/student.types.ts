export interface IStudent {
  studentId: string;
  avatar: string;
  batchId: string;
  email: string;
  name: string;
  phone: string;
  registration: string;
  roll: string;
}

export interface ITeacher {
  teacherId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  password: string;
  teacherCode: string;
  pinned?: boolean;
  position?: number;
  image?: string;
}

export interface INotice {
  noticeId: string;
  title: string;
  description: string;
  images?: any;
}
