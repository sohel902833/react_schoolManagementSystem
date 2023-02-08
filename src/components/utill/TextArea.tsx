interface Props {
  type: string;
  placeholder: string;
  error: string;
  label: string;
  required?: boolean;
  rest?: any;
  value?: any;
  onChange?: any;
  rows?: number;
}
const TextArea = ({
  type,
  placeholder,
  error,
  label,
  required,
  rest,
  value,
  onChange,
  rows = 1,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="dark:text-white text-black p-2 text-xl font-semibold">
        {label}
        {required && " *"}
      </p>
      <textarea
        className={`bg-transparent focus:bg-transparent border-2 rounded-lg px-4 py-4 w-full focus:outline-none text-black dark:text-white text-xl ${
          error ? "border-red-500" : " border-purple-900"
        }`}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        rows={rows}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default TextArea;
