export interface IOnlineAdmit {
  admitId: string;
  name: string;
  phone: string;
  studentName: string;
  className: string;
  age?: string;
  email?: string;
}

export interface IContact {
  contactId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface IActivity {
  title?: string;
  link: string;
  type: string;
  activityId: string;
  images?: string[];
}
