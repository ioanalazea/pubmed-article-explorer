import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-[#4F6D7A] text-white font-bold uppercase rounded-md px-4 py-2 hover:bg-[#3e5963] transition-colors duration-200 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}

export { Button };
