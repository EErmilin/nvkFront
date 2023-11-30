import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { date, object, string } from "yup";
import { IService } from "../../../models/Service";
import Input from "../../UI/areas/Input/Input";
import ModalWithBackground from "../ModalWithBackground/ModalWithBackground";
import classes from "./PayServiceModal.module.scss";
import CustomTextArea from "../../UI/areas/CustomTextArea/CustomTextArea";
import CustomDatePicker from "../../UI/areas/CustomDatePicker/CustomDatePicker";
import { API_URL, IMAGE_UPLOAD_URL } from "../../../api/config";
import { useAppSelector } from "../../../redux/hooks";
import FileInput from "../../UI/areas/FileInput/FileInput";

const PayServiceModal = ({
  closeModal,
  service,
}: {
  closeModal: () => void;
  service: IService;
}) => {
  const user = useAppSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);

  /** Начальные значения */
  const initialValues = {
    step: 1 as 1 | 2,
    contactName: user?.firstname || "",
    phoneNumber: user?.phone || "",
    serviceId: service.id,
    email: user?.email || "",
    date: null,
    content: "",
    files: [] as File[],
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
      const { step, phoneNumber, files, ...data } = values;
      if (step === 1) {
        setFieldValue("step", 2);
        return;
      }

      setLoading(true);
      try {
        let imageIds: string[] | undefined;
        if (files.length > 0) {
          imageIds = await Promise.all(
            files.map(async (f) => {
              const formData = new FormData();
              formData.append("file", f);
              const response = await fetch(IMAGE_UPLOAD_URL, {
                method: "POST",
                body: formData,
              }).then((r) => r.json());
              return response.id;
            })
          );
        }

        const res = await fetch(`${API_URL}/cloudpayments/pay-service`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
            imageIds,
            phoneNumber: "+" + phoneNumber.replace(/\D/g, ""),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) => r.json());

        if (res?.url) {
          window.location.href = res.url;
        }
      } catch {
        setLoading(false);
      }
    },
  });

  const price = useMemo(() => {
    let price = service.price;
    const totalWords = values.content.split(" ").length;
    const totalImages = values.files.length || 0;
    if (
      typeof service.freeWords === "number" &&
      totalWords > service.freeWords &&
      !!service.wordPrice
    ) {
      price += (totalWords - service.freeWords) * service.wordPrice;
    }

    if (
      typeof service.freeImages === "number" &&
      totalImages > service.freeImages &&
      !!service.imagePrice
    ) {
      price += (totalImages - service.freeImages) * service.imagePrice;
    }

    return price;
  }, [service, values.content, values.files]);

  return (
    <ModalWithBackground btnCancelClick={closeModal} width={494}>
      <div className={classes.modal}>
        <div className={classes.modal_header}>
          <h2>Анкета</h2>
          {values.step > 1 && (
            <button
              className={classes.modal_header_btn_return}
              onClick={() => setFieldValue("step", values.step - 1)}
            >
              Вернуться
            </button>
          )}
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
              <FileInput
                accept=".png, .jpg, .jpeg"
                multiple
                onChange={(e) =>
                  setFieldValue("files", Array.from(e.target.files || []))
                }
              />
              <div className={classes.content}>
                <div className={classes.content_label}>
                  Введено слов:{" "}
                  {values.content.split(" ").filter((w) => !!w).length}
                  <span> / </span>
                  Сумма к оплате: {price} руб.
                </div>
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
              </div>
            </>
          )}

          <div className={classes.divider} />

          {values.step === 1 && (
            <div className={classes.note}>
              Нажимая на кнопку, Вы даете свое согласие на обработку
              персональных данных.
            </div>
          )}

          <button
            type="submit"
            className={classes.modal_form_btn}
            disabled={loading}
          >
            {loading
              ? "Отправка..."
              : values.step === 1
              ? "Далее 1/2"
              : "Перейти к оплате"}
          </button>
        </form>
      </div>
    </ModalWithBackground>
  );
};

export default PayServiceModal;
