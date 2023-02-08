interface Props {
  value?: any;
  onChange: (e: any) => void;
  label: string;
  optionList: any[];
  error?: string;
  isRequired?: boolean;
  renderItem: any;
}

const Select = ({
  label,
  value,
  onChange,
  error,
  isRequired,
  optionList,
  renderItem,
}: Props) => {
  return (
    <>
      <p className="dark:text-white text-black p-2 text-xl font-semibold">
        {label}
        {isRequired && " *"}
      </p>
      <div>
        <select
          className={`w-full dark:text-white  bg-transparent dark:bg-slate-800 border-2 p-4 rounded-md cursor-pointer text-xl  ${
            error ? "border-red-500" : " border-purple-900"
          }`}
          value={value}
          onChange={onChange}
        >
          {optionList.map((item, index) => renderItem(item, index))}
        </select>
      </div>
      <p className="text-red-500">{error}</p>
    </>
  );
};

export default Select;
