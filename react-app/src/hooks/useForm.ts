import { useState } from "react";
type Errors<T> = {
  [K in keyof T]?: string;
};
function useForm<T>(initialValues: T, validate: (values: T) => Errors<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<Errors<T>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (callback: (values: T) => void) => {
    const validationErrors = validate(values);

    setErrors(validationErrors);

    const hasError = Object.keys(validationErrors).length > 0;

    if (!hasError) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
export default useForm;
