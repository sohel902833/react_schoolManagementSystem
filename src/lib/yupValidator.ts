import * as Yup from "yup";
export const batchValidationScheme = Yup.object({
  className: Yup.string().required("Please Select Class Name"),
  batchName: Yup.string()
    .required("Please Enter Batch Name")
    .max(30, "Batch Name is too long (maximum is 30 characters)"),
  group: Yup.string().required("Please Enter Group"),
  session: Yup.string().required("Please Enter Session"),
});

export const noticeValidationScheme = Yup.object({
  title: Yup.string().required("Please Enter Notice Title"),
  description: Yup.string().required("Please Enter Notice Description"),
});
export const studentValidationScheme = Yup.object({
  name: Yup.string().required("Please Enter Student Name"),
  roll: Yup.string().required("Enter Roll No."),
  batch: Yup.string().required("Please Select Batch"),
});
export const teacherValidationScheme = Yup.object({
  name: Yup.string().required("Please Enter Teacher Name"),
  title: Yup.string().required("Enter Title"),
  phone: Yup.string().required("Enter Phone Number"),
  password: Yup.string().required("Enter Password"),
  teacherCode: Yup.string().required("Enter Teacher Id"),
  email: Yup.string()
    .required("Please Enter Your Email")
    .email("Invalid Email"),
});
export const basicInfoValidatorSchema = Yup.object({
  instituteName: Yup.string().required("Please Enter Institute Name"),
  description: Yup.string().required("Enter Description"),
  headLine: Yup.string().required("Enter Headline"),
  logoLink: Yup.string().required("Enter Logo Link"),
  facebookLink: Yup.string().required("Enter Facebook Link"),
  youtubeLink: Yup.string().required("Enter Youtube Link"),
  linkedinLink: Yup.string().required("Enter Linkedin Link"),
  aboutUs: Yup.string().required("Enter About Us"),
});
export const sliderValidatorScheme = Yup.object({
  title: Yup.string().required("Please Enter Title"),
  imageUrl: Yup.string().required("Enter Image URL"),
  imageName: Yup.string().required("Enter Image Name"),
});

export const onlineAdmitValidatorScheme = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  phone: Yup.string().required("Please Enter Your Phone"),
  studentName: Yup.string().required("Please Enter Student Name"),
  wantedClass: Yup.string().required("Please Enter Class"),
});
export const contactValidatorScheme = Yup.object({
  name: Yup.string().required("Please Enter Your Name"),
  phone: Yup.string().required("Please Enter Your Phone"),
  email: Yup.string().required("Please Enter Email"),
  message: Yup.string().required("Please Type Your Message"),
});
export const activityValidatorScheme = Yup.object({
  title: Yup.string().required("Please Enter Title"),
  link: Yup.string().required("Please Enter Link"),
  type: Yup.string().required("Please Select type"),
});
export const resultShitValidatorScheme = Yup.object({
  name: Yup.string().required("Please Enter Result Shit Name"),
  batchId: Yup.string().required("Please Select Batch"),
});
