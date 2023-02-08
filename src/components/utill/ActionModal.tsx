import Modal from "./Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message?: string;
  actionLoading?: boolean;
  actionLoadingText?: string;
  actionHandler: () => void;
}
const ActionModal = ({
  open,
  setOpen,
  title,
  message,
  actionLoading,
  actionHandler,
}: Props) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full py-3 ">
        <h2 className="mb-4  text-purple-800 font-extrabold text-2xl">
          {title}
        </h2>
        <h2 className="mb-4  text-purple-800 font-bold text-xl">{message}</h2>
        <hr />
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={actionHandler}
            className="bg-purple-600 px-7 py-2 rounded-sm text-slate-50 font-extrabold hover:bg-purple-500 "
          >
            {actionLoading ? actionLoading : "Yes"}
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default ActionModal;
