import { HTMLProps } from "react";

export function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      id="textarea"
      className="w-full resize-none h-40 rounded-md outline-none p-2 placeholder:text-center placeholder:my-auto"
      {...rest}
    ></textarea>
  );
}
