import { useContext, useCallback, cloneElement, useRef, useState } from "react";
import { FormContext } from "../context";

export default function FormItem({
  name,
  placeholder,
  label: Label,
  rules,
  list,
  children,
  className = ''
}) {
  const {
    control,
    useWatch,
    register,
    errors,
    resetField,
    setFocus,
    setValue,
  } = useContext(FormContext);
  const { required = false, message, format, ...otherOptions } = rules;

  const registerOptions = register(name, {
    required,
    ...otherOptions,
  });

  const formItemRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

  // const { ref, ...rest } = register(name);

  // 监听输入框变化
  function onInput(e) {
    const val = e.target.value.replace(format, "");
    setValue(name, val);
  }

  function onFocus() {
    setIsFocus(true);
  }
  function onBlur() {
    setIsFocus(false);
  }

  const config = {
    ...(format ? { onInput } : {}),
    ...(list ? { list } : {}),
    placeholder,
  };

  // 文本内容
  const watchText = useWatch({ control, name });

  // 清除事件
  function onClear() {
    resetField(name, {
      keepError: true,
      keepDirty: true,
      keepTouched: true,
      defaultValue: "",
    });
    setFocus(name);
  }

  const ChildElement = useCallback(
    () =>
      cloneElement(children, {
        hook: {
          formItemRef,
          setValue,
          control,
          useWatch,
          onFocus,
          onBlur,
        },
        options: {
          ...registerOptions,
          ...config,
        },
      }),
    [
      children,
      registerOptions,
      config,
      formItemRef,
      setValue,
      control,
      useWatch,
      onFocus,
      onBlur,
    ]
  );

  return (
    <div className={`relative mb-6 ${className}`} ref={formItemRef}>
      <div
        className={`flex items-center text-base border-2 box-border rounded-xl bg-gray-100 transition-all duration-100 ${
          errors[name] ? "error-input" : "default-input"
        } ${isFocus ? "focus-input bg-white" : ""}`}
      >
        <div className="px-1.5 left">{Label ? <Label /> : null}</div>
        <div className="relative flex-1 flex">
          <div className="relative flex-1">{ChildElement()}</div>
          <div className="flex items-center justify-center px-1.5 text-gray-400 right">
            {/* 清除图标 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${watchText?.toString() ? "" : "invisible"}`}
              onClick={onClear}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="absolute top-full left-0 leading-6 text-xs text-red-500">
            {errors[name] && message}
          </div>
        </div>
      </div>
    </div>
  );
}
