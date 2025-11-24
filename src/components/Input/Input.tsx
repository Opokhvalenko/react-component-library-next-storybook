import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useId,
  useState,
} from "react";
import "./Input.css";

export type InputType = "text" | "password" | "number" | "email";

type InputBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
>;

export interface InputProps extends InputBaseProps {
  label?: string;
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  error?: string;
}

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

function PasswordToggleButton({ isVisible, onToggle }: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      className="input-icon-button"
      aria-label={isVisible ? "Hide password" : "Show password"}
      onClick={onToggle}
    >
      {isVisible ? "🙈" : "👁"}
    </button>
  );
}

interface ClearButtonProps {
  onClear: () => void;
}

function ClearButton({ onClear }: ClearButtonProps) {
  return (
    <button
      type="button"
      className="input-icon-button input-icon-button--clear"
      aria-label="Clear input"
      onClick={onClear}
    >
      ×
    </button>
  );
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", value, onChange, clearable, error, ...rest },
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const id = useId();

  const showPasswordToggle = type === "password";
  const showClear = Boolean(clearable && value.length > 0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  const effectiveType =
    type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="input-root">
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="input-wrapper">
        <input
          id={id}
          ref={ref}
          className={`input-field${error ? " input-field--error" : ""}`}
          type={effectiveType}
          value={value}
          onChange={handleChange}
          {...rest}
        />

        {showPasswordToggle && (
          <PasswordToggleButton
            isVisible={isPasswordVisible}
            onToggle={() => setIsPasswordVisible((prev) => !prev)}
          />
        )}

        {showClear && <ClearButton onClear={handleClear} />}
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
});

export default Input;