import { useRef, useState } from "react";
import classes from "./CustomDatePicker.module.scss";
import "./CustomDatePicker.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru, enGB } from "date-fns/esm/locale";
import React from "react";

registerLocale("ru-RU", ru);

const CustomDatePicker = ({
  className,
  id,
  value,
  onChange,
  placeholder,
  errorMessage,
  ...props
}: any) => {
  const [isPlaceHolder, setIsPlaceHolder] = useState(!value);
  /** Формируем cтили обертки */
  const cls = [classes.CustomDatePicker];
  if (className) {
    cls.push(className);
  }

  const pickerRef = useRef(null);

  const setDate = (e: Date) => {
    setIsPlaceHolder(false);
    onChange(e);
  };

  const calendar = (
    <DatePicker
      placeholderText={placeholder ?? "Дата рождения"}
      locale={"ru-RU"}
      dateFormat={["dd.MM.yyyy", "dd/MM/yyyy", "ddMMyyyy", "dd MM yyyy"]}
      id={id}
      selected={!isPlaceHolder ? new Date(value) : null}
      ref={pickerRef}
      onChange={setDate}
      className={errorMessage && "invalid"}
      {...props}
    />
  );

  return (
    <div className={classes.wrapper}>
      <div className={cls.join(" ")}>{calendar}</div>
      {errorMessage && <div className={classes.error}>{errorMessage}</div>}
    </div>
  );
};

export default CustomDatePicker;
