import {
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classes from "./FileInput.module.scss";
import { ReactComponent as Link } from "../../../../assets/img/link.svg";
import { ReactComponent as Info } from "../../../../assets/img/info.svg";
import { plural } from "../../../../helpers/plural";

const FileInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, placeholder = "Файл не выбран", onChange, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);
  const [files, setFiles] = useState<File[]>([]);

  const withFiles = files.length > 0;
  const value = withFiles
    ? files.length > 1
      ? `Выбрано ${files.length} ${plural(
          ["файл", "файла", "файлов"],
          files.length
        )}`
      : files.map((f) => f.name).join(", ")
    : placeholder;

  return (
    <div className={classes.wrapper + " " + className}>
      <input
        type="file"
        ref={inputRef}
        className={classes.input}
        onChange={(e) => {
          setFiles(Array.from(e.target.files || []));
          onChange && onChange(e);
        }}
        {...props}
      />
      <button
        className={classes.btn}
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        Выберите файл{props.multiple && "ы"}
        <Link />
      </button>
      <div
        className={classes.file + (!withFiles ? " " + classes.file_empty : "")}
      >
        {value}
        {!withFiles && <Info />}
      </div>
    </div>
  );
});

FileInput.displayName = "FileInput";

export default FileInput;
