import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  clearable?: boolean; // 👈 new prop
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses: Record<"filled" | "outlined" | "ghost", string> = {
  filled: "bg-gray-100 border border-transparent focus:border-blue-500",
  outlined: "border border-gray-300 focus:border-blue-500",
  ghost: "bg-transparent border-b border-gray-300 focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  loading = false,
  clearable = false, // 👈 default false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          type={
            label?.toLowerCase().includes("password") && !showPassword
              ? "password"
              : "text"
          }
          className={`w-full rounded-md outline-none transition 
            ${sizeClasses[size]} ${variantClasses[variant]} 
            ${disabled || loading ? "bg-gray-200 cursor-not-allowed" : ""}
            ${invalid ? "border-red-500 focus:border-red-500" : ""}
            dark:bg-gray-800 dark:text-white
          `}
        />

        {/* Clear button */}
        {clearable && value && !loading && !disabled && (
          <button
            onClick={handleClear}
            className="absolute right-2 text-gray-500 hover:text-red-500"
            type="button"
          >
            ✖
          </button>
        )}

        {/* Password toggle */}
        {label?.toLowerCase().includes("password") && !loading && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${clearable && value ? "right-8" : "right-2"} 
              text-gray-500 hover:text-blue-500`}
            type="button"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 border-2 border-blue-500 border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
        )}
      </div>

      {/* Helper & Error text */}
      {helperText && !invalid && !loading && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
