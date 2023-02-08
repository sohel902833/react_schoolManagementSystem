export interface IBatch {
  batchId: string;
  batchName: string;
  classId: string;
  group: string;
  session: string;
}
export interface IResultShit {
  resultShitId: string;
  batchId: string;
  name: string;
  status: string;
}
export interface IResult {
  resultId: string;
  studentId: string;
  batchId: string;
  shitId: string;
  position: string;
  gpa: string;
}

export interface IBasicInfo {
  instituteName: string;
  description: string;
  headLine: string;
  logoLink: string;
  facebookLink: string;
  youtubeLink: string;
  linkedinLink: string;
  aboutUs: string;
}
