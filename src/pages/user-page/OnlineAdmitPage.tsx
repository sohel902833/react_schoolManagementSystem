import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { ONLINE_ADMIT_REF_NAME } from "../../api/databaseRef";
import TextInput from "../../components/utill/TextInput";
import { onlineAdmitValidatorScheme } from "../../lib/yupValidator";
import { IOnlineAdmit } from "../../types/user.types";

const OnlineAdminPage = () => {
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [wantedClass, setWantedClass] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [age, setAge] = useState("");

  const db = getDatabase();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onlineAdmitValidatorScheme
      .validate(
        {
          name,
          phone,
          wantedClass,
          studentName,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        createOnlineAdmit();
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  const createOnlineAdmit = async () => {
    try {
      setCreateLoading(true);
      const newOnlineAdmit: IOnlineAdmit = {
        admitId: new Date().getTime().toString(),
        name,
        phone,
        className: wantedClass,
        age: age ? age : "",
        email: email ? email : "",
        studentName,
      };
      await update(ref(db, ONLINE_ADMIT_REF_NAME), newOnlineAdmit);
      setCreateLoading(false);
      clearInput();
      toast.success(
        "Thanks for your request, we will contact with you very soon."
      );
    } catch (err) {
      setErrors({});
      setCreateLoading(false);
      toast.error("Something Wrong!!");
    }
  };

  const clearInput = () => {
    setName("");
    setAge("");
    setPhone("");
    setEmail("");
    setStudentName("");
    setWantedClass("");
  };

  return (
    <>
      <h1 className="container mx-auto font-extrabold text-2xl mt-10 bg-blue-500 p-4 text-white dark:bg-slate-800">
        Online Admit
      </h1>
      <div className="h-screen container mt-5 mx-auto flex flex-col-reverse md:flex-row gap-5 sm:flex-col-reverse">
        <div className="flex-[3] mb-10">
          <div className="w-[60%]">
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Name"
                placeholder="Enter Your Name"
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                error={errors?.name}
                required={true}
              />
              <TextInput
                label="Phone"
                placeholder="Enter Your Phone"
                type="text"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
                error={errors?.phone}
                required={true}
              />
              <TextInput
                label="Email"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                error={errors?.email}
                required={true}
              />
              <TextInput
                label="Student Name"
                placeholder="Enter Student Name"
                type="text"
                value={studentName}
                onChange={(e: any) => setStudentName(e.target.value)}
                error={errors?.studentName}
                required={true}
              />
              <TextInput
                label="Class Name"
                placeholder="Enter Class Name"
                type="text"
                value={wantedClass}
                onChange={(e: any) => setWantedClass(e.target.value)}
                error={errors?.wantedClass}
                required={true}
              />
              <TextInput
                label="Student Age"
                placeholder="Enter Student Age"
                type="text"
                value={age}
                onChange={(e: any) => setAge(e.target.value)}
                error={errors?.age}
                required={true}
              />
              <br />
              <br />
              <button
                className="bg-purple-800 px-4 py-2 rounded-lg text-white hover:bg-purple-900"
                type="submit"
              >
                {createLoading ? "Uploading Your Request.." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default OnlineAdminPage;
