import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { CONTACT_REF_NAME } from "../../api/databaseRef";
import TextArea from "../../components/utill/TextArea";
import TextInput from "../../components/utill/TextInput";
import { contactValidatorScheme } from "../../lib/yupValidator";
import { IContact } from "../../types/user.types";

const ContactUs = () => {
  const [errors, setErrors] = useState<any>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const db = getDatabase();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    contactValidatorScheme
      .validate(
        {
          name,
          phone,
          email,
          message,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        createContact();
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  const createContact = async () => {
    try {
      setCreateLoading(true);
      const newContact: IContact = {
        contactId: new Date().getTime().toString(),
        name,
        phone,
        email,
        message,
      };
      await update(ref(db, CONTACT_REF_NAME), newContact);
      setCreateLoading(false);
      clearInput();
      toast.success("Thanks for your comment.");
    } catch (err) {
      setErrors({});
      setCreateLoading(false);
      toast.error("Something Wrong!!");
    }
  };

  const clearInput = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <h1 className="container mx-auto font-extrabold text-2xl mt-10 bg-blue-500 p-4 text-white dark:bg-slate-800">
        Contact
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
              <TextArea
                label="Comment Message"
                placeholder="Enter Your Comment About Us."
                type="text"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                error={errors?.message}
                required={true}
                rows={5}
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

export default ContactUs;
