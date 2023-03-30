import { useState } from "react";

const useValidation = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const validValue = validateValue(enteredValue);
  const hasError = !validValue && isTouched;

  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const onBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = (event) => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: validValue,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useValidation;
