import { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ label, className = "", id, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1 m-4">
      {label && (
        <label className="text-[12px] font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`bg-[#e8e8e8] border-2 border-[#dad6d6] focus:outline-none p-2 text-gray rounded-md hover:bg-[#e0dede] transition-colors duration-200 ${className}`}
        {...props}
      ></input>
    </div>
  );
}

export { Input };
