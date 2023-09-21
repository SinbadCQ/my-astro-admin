import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Select({
  hook: { formItemRef, setValue, control, useWatch, onFocus, onBlur },
  options: { list, ...config },
}) {
  const [styles, setStyles] = useState({});
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("");
  const watchText = useWatch({ control, name: config.name });
  const selectRef = useRef(null);

  // 关闭
  function onClose() {
    setShow(false);
    setTimeout(() => {
      setOpen(false);
    }, 200);
    onBlur();
  }

  // 开启
  function onOpen() {
    setOpen(true);
    onFocus();
  }

  function onChange(item) {
    setValue(config.name, item.value);
    onClose();
  }

  // 计算弹窗位置
  function setPopupPosition() {
    const winH = window.screen.height;
    const sT = document.documentElement.scrollTop || document.body.scrollTop; //网页当前滚动的距离
    const selectObj = selectRef?.current || { clientHeight: 0 };
    const {
      clientWidth: width = 0,
      clientHeight: height = 0,
      offsetLeft: left = 0,
      offsetTop: top = 0,
    } = formItemRef?.current || {};

    const flag = winH - (top - sT) - height >= selectObj.clientHeight;
    const realTop = flag ? top + height : top - selectObj.clientHeight;

    setStyles({ width, left, top: realTop });
    setPosition(flag ? "bottom" : "top");
  }

  const values = useMemo(() => {
    return (
      list.find((e) => e.value.toString() === watchText.toString()) || {
        value: "",
        text: "",
      }
    );
  }, [watchText]);

  useEffect(() => {
    if (open) {
      startTransition(() => {
        setShow(open);
      });
    }
  }, [position]);

  useEffect(() => {
    if (open) {
      setPopupPosition();
    } else {
      setStyles({});
      setPosition("");
    }
  }, [open]);

  return (
    <>
      <input
        {...config}
        readOnly
        className={`${
          values.text ? "invisible" : ""
        } w-full py-3 text-base placeholder:text-gray-300 outline-none bg-transparent`}
      />
      <div
        className="absolute top-0 right-0 bottom-0 left-0 flex items-center text-base"
        onClick={onOpen}
      >
        {values.text}
      </div>

      {open
        ? createPortal(
            <div>
              <div
                className="fixed top-0 right-0 bottom-0 left-0 z-10"
                onClick={onClose}
              ></div>
              <ul
                ref={selectRef}
                className={`absolute z-10 max-h-60 p-2 overflow-y-auto overflow-x-hidden shadow-2xl bg-white rounded-2xl transition-all duration-200 ${
                  !show
                    ? `opacity-0 ${
                        position === "bottom"
                          ? "translate-y-5"
                          : position === "top"
                          ? "-translate-y-5"
                          : ""
                      }`
                    : position === "bottom"
                    ? "translate-y-1"
                    : "-translate-y-1"
                }`}
                style={styles}
              >
                {list.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center py-2 px-2 text-sm text-gray-700 rounded-lg transition-all ${
                      item.value === values.value && "bg-gray-100"
                    }`}
                    onClick={() => onChange(item)}
                  >
                    <div className="flex items-center justify-center w-6 h-6 mr-2 p-1 rounded-full border border-slate-300 bg-white">
                      <div
                        className={`w-full h-full rounded-full transition-all ${
                          item.value === values.value && "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
