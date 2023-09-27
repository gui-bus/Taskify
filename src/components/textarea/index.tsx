import { HTMLProps } from "react";

export function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      id="textarea"
      className="w-full h-20 resize-none rounded-md outline-none p-2 text-sm"
      {...rest}
    ></textarea>
  );
}
