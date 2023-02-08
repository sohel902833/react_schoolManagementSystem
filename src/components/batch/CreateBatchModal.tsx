import { getDatabase, ref, set, update } from "firebase/database";
import { useState } from "react";
import { toast } from "react-toastify";
import { BATCH_REF_NAME } from "../../api/databaseRef";
import useGetClass from "../../hooks/useGetClass";
import { batchValidationScheme } from "../../lib/yupValidator";
import { IBatch } from "../../types/batch.types";
import Modal from "../utill/Modal";
import Select from "../utill/Select";
import TextInput from "../utill/TextInput";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  batch?: IBatch;
}
const CreateBatchModal = ({ open, setOpen, edit, batch }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const { loading, data } = useGetClass();
  const [className, setClassName] = useState(batch?.classId || "");
  const [batchName, setBatchName] = useState(batch?.batchName || "");
  const [group, setGroup] = useState(batch?.group || "");
  const [session, setSession] = useState(batch?.session || "");
  const [createBatchLoading, setCreateBatchLoading] = useState(false);

  const db = getDatabase();
  const handleSubmit = () => {
    batchValidationScheme
      .validate(
        {
          className,
          batchName,
          group,
          session,
        },
        { abortEarly: false }
      )
      .then(async (value) => {
        setErrors({});
        if (edit && batch?.batchId) {
          editBatch();
        } else {
          createBatch();
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

  const editBatch = async () => {
    try {
      setCreateBatchLoading(true);
      const updatedNewBatch: IBatch = {
        ...(batch as IBatch),
        batchName,
        classId: className,
        group,
        session,
      };
      await update(
        ref(db, `${BATCH_REF_NAME}/${updatedNewBatch?.batchId}`),
        updatedNewBatch
      );
      resetForm();
      toast.success("Batch Updated Successful");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const createBatch = async () => {
    try {
      setCreateBatchLoading(true);
      const newBatch: IBatch = {
        batchId: new Date().getTime().toString(),
        batchName,
        classId: className,
        group,
        session,
      };
      await set(ref(db, `${BATCH_REF_NAME}/${newBatch?.batchId}`), newBatch);
      resetForm();
      toast.success("Batch Created");
    } catch (er) {
      toast.error("Something Wrong.");
    }
  };

  const resetForm = () => {
    setCreateBatchLoading(false);
    setOpen(false);
    setSession("");
    setGroup("");
    setBatchName("");
    setClassName("");
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
          {edit ? "Update Batch" : "Create New Batch"}
        </h2>
        <hr />
        <TextInput
          label="Batch Name"
          placeholder="Enter Batch Name"
          type="text"
          value={batchName}
          onChange={(e: any) => setBatchName(e.target.value)}
          error={errors?.batchName}
          required={true}
        />
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Select
            label="Class"
            onChange={(e: any) => setClassName(e.target.value)}
            value={className}
            error={errors?.className}
            isRequired={true}
            optionList={data}
            renderItem={(item: any, index: number) => (
              <option value={item?.classId}>{item?.className}</option>
            )}
          />
        )}
        <Select
          label="Group"
          onChange={(e: any) => setGroup(e.target.value)}
          value={group}
          error={errors?.group}
          isRequired={true}
          optionList={["A", "B", "C", "D"]}
          renderItem={(item: any, index: number) => (
            <option value={item}>{item}</option>
          )}
        />{" "}
        <Select
          label="Session"
          onChange={(e: any) => setSession(e.target.value)}
          value={session}
          error={errors?.session}
          isRequired={true}
          optionList={getSessionList()}
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
            {createBatchLoading ? "Creating.." : "Create"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default CreateBatchModal;
