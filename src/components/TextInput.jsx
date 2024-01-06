/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyle, register, name, error },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyle}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && (
          <span className="ml-4 font-medium text-xs text-[#f64949fe] mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default TextInput;
