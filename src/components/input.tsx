import { cn } from "@/lib/styles";
import { ClassValue } from "clsx";
import { UseFormRegister } from "react-hook-form";

export function Input({
  type = "text",
  name,
  label,
  register,
  hasError,
  errorMessage,
  required,
  className,
}: {
  type?: HTMLInputElement["type"];
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  hasError: boolean;
  errorMessage: string;
  required?: boolean;
  className?: ClassValue;
}) {
  const labelId = name + ".label";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label id={labelId} htmlFor={name} className="text-sm">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        aria-required={required ? "true" : "false"}
        aria-describedby={labelId}
        aria-invalid={hasError ? "true" : "false"}
        className={cn(
          "p-2 outline-none border border-Gray-500 rounded-lg",
          "hover:cursor-pointer hover:border-primary focus:border-primary focus:bg-focus-background",
          "aria-[invalid=true]:border-error aria-[invalid=true]:focus:bg-inherit"
        )}
      />
      {hasError && <p className="text-sm text-error">{errorMessage}</p>}
    </div>
  );
}
