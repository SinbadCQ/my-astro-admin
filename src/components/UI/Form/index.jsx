import { useForm, useWatch } from "react-hook-form";
import FormItem from "./FormItem";
import { FormContext } from "./context";
import { useEffect } from "react";

export function Form({ defaultValues = {}, submit, children }) {
  /**
   * trigger 触发校验
   * resetField 重置字段
   * setFocus 设置字段焦点
   * watch 监听
   */
  const {
    control,
    register,
    handleSubmit,
    trigger,
    resetField,
    setValue,
    setFocus,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues,
  });

  // const resetAsyncForm = useCallback(() => {
  //   console.log(123)
  //   reset(defaultValues);
  // }, [defaultValues]);

  // useEffect(() => {
  //   console.log(9)
  //   resetAsyncForm();
  // }, [resetAsyncForm]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContext.Provider
        value={{
          useWatch,
          control,
          register,
          handleSubmit,
          trigger,
          resetField,
          setValue,
          setFocus,
          errors,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}

Form.Item = FormItem;