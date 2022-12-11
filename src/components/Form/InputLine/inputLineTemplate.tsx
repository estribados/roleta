import React, { InputHTMLAttributes } from "react";

interface InputLineProps  extends InputHTMLAttributes<HTMLInputElement> {
  type: string,
  name: string
  onBlur: (e: React.ChangeEvent) => void;
  prefix?: string
  defaultValue?: string | number
}

// eslint-disable-next-line react/display-name
const InputLine = React.forwardRef<Record<string, any>, InputLineProps>(({
  name, type,
  onBlur,
  prefix,
  defaultValue,
  ...rest
}, ref) => {

  return (
    <div className="mt-1 border relative rounded-md shadow-sm">
      <input
        {...rest}
        defaultValue={defaultValue}
        key={defaultValue}
        ref={(element) => {
          if (ref)
            (ref as Record<string, any>).current[name] = element
        }}
        onBlur={onBlur}
        type={type}
        name={name}
        id={name}
        className={`
          md:mb-0 mb-2 text-black  input-sm bg-white input input-bordered input-warning w-full max-w-xs
          `}
      />

    </div>
  );
});

export { InputLine };


