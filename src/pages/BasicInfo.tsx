import { useState } from "react";
import TextArea from "../components/utill/TextArea";
import TextInput from "../components/utill/TextInput";
import imgAvatar from "../assets/avatar.svg";
import { basicInfoValidatorSchema } from "../lib/yupValidator";
import { toast } from "react-toastify";
import { IBasicInfo } from "../types/batch.types";
import { getDatabase, ref, update } from "firebase/database";
import { BASIC_INFO_REF_NAME } from "../api/databaseRef";
import { useWrapper } from "../context/DataWrapper";
const BasicInfo = () => {
  const { basicInfo } = useWrapper();
  const [errors, setErrors] = useState<any>({});
  const [instituteName, setInstituteName] = useState(
    basicInfo?.instituteName || ""
  );
  const [description, setDescription] = useState(basicInfo?.description || "");
  const [headLine, setHeadline] = useState(basicInfo?.headLine || "");
  const [logoLink, setLogoLink] = useState(basicInfo?.logoLink || "");
  const [facebookLink, setFacebookLink] = useState(
    basicInfo?.facebookLink || ""
  );
  const [youtubeLink, setYoutubeLink] = useState(basicInfo?.youtubeLink || "");
  const [linkedinLink, setLinkedinLink] = useState(
    basicInfo?.linkedinLink || ""
  );
  const [aboutUs, setAboutUs] = useState(basicInfo?.aboutUs || "");
  const [updateLoading, setUpdateLoading] = useState(false);
  const db = getDatabase();

  const handleSubmit = () => {
    basicInfoValidatorSchema
      .validate(
        {
          instituteName,
          description,
          logoLink,
          facebookLink,
          youtubeLink,
          linkedinLink,
          headLine,
          aboutUs,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        updateBasicInfo();
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  const updateBasicInfo = async () => {
    try {
      setUpdateLoading(true);
      const newBasicInfo: IBasicInfo = {
        description,
        facebookLink,
        headLine,
        instituteName,
        linkedinLink,
        logoLink,
        youtubeLink,
        aboutUs,
      };
      await update(ref(db, BASIC_INFO_REF_NAME), newBasicInfo);
      setUpdateLoading(false);
    } catch (err) {
      setErrors({});
      setUpdateLoading(false);
      toast.error("Something Wrong!!");
    }
  };

  return (
    <div className="flex flex-col gap-1 px-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl dark:text-fuchsia-300 font-extrabold text-fuchsia-900">
          Customize Web Home Page
        </h2>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextInput
            label="Institute Name"
            placeholder="Enter Institute Name"
            type="text"
            value={instituteName}
            onChange={(e: any) => setInstituteName(e.target.value)}
            error={errors?.instituteName}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextArea
            label="Institute Description"
            placeholder="Enter Institute Description"
            type="text"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            error={errors?.description}
            required={true}
            rows={5}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextArea
            label="Headline Notice"
            placeholder="Enter Institute Name"
            type="text"
            value={headLine}
            onChange={(e: any) => setHeadline(e.target.value)}
            error={errors?.headLine}
            required={true}
            rows={4}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <div className="flex items-center gap-1">
            <img
              src={basicInfo?.logoLink ? basicInfo?.logoLink : imgAvatar}
              className="w-[60px] h-[60px] object-cover rounded-sm"
            />
            <label
              htmlFor="logo"
              className="bg-purple-800 p-4 cursor-pointer text-white rounded-sm "
            >
              Choose Logo
            </label>
            <input type="file" id="logo" className="invisible" />
          </div>
          <TextInput
            label="Logo Image Link"
            placeholder="Set Logo Image Link"
            type="text"
            value={logoLink}
            onChange={(e: any) => setLogoLink(e.target.value)}
            error={errors?.logoLink}
            required={true}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextInput
            label="Facebook Link"
            placeholder="Enter Facebook Link"
            type="text"
            value={facebookLink}
            onChange={(e: any) => setFacebookLink(e.target.value)}
            error={errors?.facebookLink}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextInput
            label="Youtube Link"
            placeholder="Enter Youtube Link"
            type="text"
            value={youtubeLink}
            onChange={(e: any) => setYoutubeLink(e.target.value)}
            error={errors?.youtubeLink}
            required={true}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-3 flex-wrap ">
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextInput
            label="Linkedin Link"
            placeholder="Enter Linkedin Link"
            type="text"
            value={linkedinLink}
            onChange={(e: any) => setLinkedinLink(e.target.value)}
            error={errors?.linkedinLink}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2  grow  p-4 basis-80">
          <TextArea
            label="About Us"
            placeholder="Enter About Us"
            type="text"
            value={aboutUs}
            onChange={(e: any) => setAboutUs(e.target.value)}
            error={errors?.aboutUs}
            required={true}
            rows={4}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-purple-600 px-7 py-2 w-[140px] rounded-sm text-slate-50 font-extrabold hover:bg-purple-500 "
      >
        {updateLoading ? "Updating.." : "Update"}
      </button>
    </div>
  );
};

export default BasicInfo;
