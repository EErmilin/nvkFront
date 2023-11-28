import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { date, object, string } from "yup";
import { IService } from "../../../models/Service";
import Input from "../../UI/areas/Input/Input";
import ModalWithBackground from "../ModalWithBackground/ModalWithBackground";
import classes from "./PayServiceModal.module.scss";
import CustomTextArea from "../../UI/areas/CustomTextArea/CustomTextArea";
import CustomDatePicker from "../../UI/areas/CustomDatePicker/CustomDatePicker";
import { API_URL } from "../../../api/config";

const PayServiceModal = ({
  closeModal,
  service,
}: {
  closeModal: () => void;
  service: IService;
}) => {
  /** Начальные значения */
  const initialValues = {
    step: 1 as 1 | 2,
    contactName: "",
    phoneNumber: "",
    serviceId: service.id,
    email: "",
    date: null,
    content: "",
  };

  /** Схема валидации */
  const validationSchema = useMemo(
    () =>
      object().shape({
        contactName: string().required("Введите имя"),
        phoneNumber: string()
          .required("Введите номер телефона")
          .transform((v: string) => v.replace(/\D/g, ""))
          .length(11, "Введите номер телефона"),
        email: string().required("Введите email").email("Введите email"),
        date: date().required("Укажите дату выхода"),
        content: string().when("step", {
          is: 2,
          then: (s) => s.required("Введите ваш текст"),
        }),
      }),
    []
  );

  /** Стейт полей и правила */
  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema,
    async onSubmit(values) {
      const { step, phoneNumber, ...data } = values;
      if (step === 1) {
        setFieldValue("step", 2);
        return;
      }

      const res = await fetch(`${API_URL}/cloudpayments/pay-service`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          phoneNumber: "+" + phoneNumber.replace(/\D/g, ""),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (r) => await r.json());

      if (res?.url) {
        window.location.href = res.url;
      }
    },
  });

  return (
    <ModalWithBackground btnCancelClick={closeModal} width={494}>
      <div className={classes.modal}>
        <div className={classes.modal_header}>
          <h2>Анкета</h2>
        </div>
        <form className={classes.modal_form} onSubmit={handleSubmit}>
          <div className={classes.title}>Форма заявления</div>
          {values.step === 1 && (
            <>
              <Input
                name="contactName"
                id="contactName"
                placeholder="Имя"
                className={classes.modal_input}
                value={values.contactName}
                errorMessage={touched.contactName && errors.contactName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                name="phoneNumber"
                placeholder="+7"
                id="phoneNumber"
                className={classes.modal_input}
                mask={"+7 (999) 999-99-99"}
                value={values.phoneNumber}
                errorMessage={touched.phoneNumber && errors.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                name="email"
                id="email"
                placeholder="Эл. Почта"
                className={classes.modal_input}
                value={values.email}
                errorMessage={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomDatePicker
                name="date"
                id="date"
                placeholder="Дата выхода"
                className={classes.modal_input}
                value={values.date}
                errorMessage={touched.date && errors.date}
                onChange={(date: Date) => setFieldValue("date", date)}
                onBlur={handleBlur}
                minDate={new Date()}
              />
            </>
          )}

          {values.step === 2 && (
            <>
              <CustomTextArea
                name="content"
                id="content"
                value={values.content}
                className={classes.modal_textarea}
                errorMessage={touched.content && errors.content}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите ваш текст"
              />
            </>
          )}

          <div className={classes.divider} />

          {values.step === 1 && (
            <div className={classes.note}>
              Нажимая на кнопку, Вы даете свое согласие на обработку
              персональных данных.
            </div>
          )}

          <button type="submit" className={classes.modal_form_btn}>
            {values.step === 1 ? "Далее 1/2" : "Перейти к оплате"}
          </button>
        </form>
      </div>
    </ModalWithBackground>
  );
};

export default PayServiceModal;
