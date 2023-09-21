import { useEffect, useState, startTransition } from "react";

export default function Transition({
  children,
  open = false,
  mode = "fade-zoom",
  className = "",
  ...other
}) {
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(() => true);
    } else {
      setFlag(false);
    }
  }, [open]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        startTransition(() => {
          setFlag(true);
        });
      }, 20);
    }
  }, [show]);

  useEffect(() => {
    if (show && !flag) {
      setTimeout(() => {
        startTransition(() => {
          setShow(false);
        });
      }, 200);
    }
  }, [flag]);

  return show ? (
    <div
      className={`${className} transition-all duration-250 ${mode}-out ${
        flag ? `${mode}-in` : ""
      }`}
      {...other}
    >
      {children}
    </div>
  ) : null;
}
