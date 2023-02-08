import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { RESULT_SHIT_REF_NAME } from "../../api/databaseRef";
import { useWrapper } from "../../context/DataWrapper";
import { resultShitValidatorScheme } from "../../lib/yupValidator";
import { IBatch, IResultShit } from "../../types/batch.types";
import Modal from "../utill/Modal";
import Select from "../utill/Select";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  resultShit?: IResultShit;
}
const CreateResultShitModal = ({ open, setOpen, edit, resultShit }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const { loading, batchList } = useWrapper();
  const [name, setName] = useState(resultShit?.name || "");
  const [batchId, setBatchId] = useState(resultShit?.batchId || "");
  const [createResultShitLoading, setCreateResultShitLoading] = useState(false);
  const [status, setStatus] = useState("pending");

  const db = getDatabase();
  const handleSubmit = () => {
    resultShitValidatorScheme
      .validate(
        {
          name,
          batchId,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && resultShit?.resultShitId) {
          editResultShit();
        } else {
          createResultShit();
        }
      })
      .catch((err) => {
        let newError: any = {};
        err.inner?.forEach((item: any) => {
          newError[item.path] = item.message;
        });
        setErrors(newError);
      });
  };

  const editResultShit = async () => {
    try {
      setCreateResultShitLoading(true);
      const updatedNewShit: IResultShit = {
        ...(resultShit as IResultShit),
        name,
        batchId,
        status,
      };
      await update(
        ref(db, `${RESULT_SHIT_REF_NAME}/${updatedNewShit?.resultShitId}`),
        updatedNewShit
      );
      resetForm();
      toast.success("Result Shit Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createResultShit = async () => {
    try {
      setCreateResultShitLoading(true);
      const newResultShit: IResultShit = {
        resultShitId: new Date().getTime().toString(),
        batchId,
        name,
        status,
      };
      await set(
        ref(db, `${RESULT_SHIT_REF_NAME}/${newResultShit?.resultShitId}`),
        newResultShit
      );
      resetForm();
      toast.success("Result Shit Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateResultShitLoading(false);
    setOpen(false);
    setName("");
    setBatchId("");
    setStatus("");
  };

  const getSessionList = () => {
    let sessionList = [];
    for (let i = 1990; i <= 1990 + 70; i++) {
      sessionList.push(i);
    }
    return sessionList;
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {edit ? "Update Result Shit" : "Create Result Shit"}
        </h2>
        <hr />
        <TextInput
          label="Shit Name"
          placeholder="Enter Shit Name"
          type="text"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          error={errors?.name}
          required={true}
        />
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Select
            label="Batch"
            onChange={(e: any) => setBatchId(e.target.value)}
            value={batchId}
            error={errors?.batchId}
            isRequired={true}
            optionList={batchList}
            renderItem={(item: IBatch, index: number) => (
              <option value={item?.batchId}>{item?.batchName}</option>
            )}
          />
        )}
        <Select
          label="Status"
          onChange={(e: any) => setStatus(e.target.value)}
          value={status}
          error={errors?.status}
          isRequired={true}
          optionList={["pending", "published"]}
          renderItem={(item: any, index: number) => (
            <option value={item}>{item}</option>
          )}
        />
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            {createResultShitLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateResultShitModal;
