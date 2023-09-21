import { useEffect } from "react";
import Transition from "../Transition";
import './index.scss'

export default function Popup({
  children,
  controller: [open = false, setOpen],
  width = "80vw",
  bgColor = "#fff",
  round = "16px",
  mode = "center",
}) {
  function onHide() {
    setOpen(false);
  }

  const config = {
    center: {
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      width,
      round,
      mode: "fade-zoom",
    },
    bottom: {
      position: "bottom-0 left-0 right-0",
      width: "100%",
      round: `${round} ${round} 0 0`,
      mode: "fade-slide-bottom",
    },
  };

  const options = config[mode];

  useEffect(() => {
    console.log(open)
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <div className="popup">
      <Transition
        open={open}
        mode="fade"
        className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 z-10"
        onClick={onHide}
      ></Transition>

      {/* <div className="fixed top-0 right-0 bottom-0 left-0 z-10 overflow-y-auto">
        <div className="min-h-full h-fit py-5 box-border flex flex-col items-center justify-center">
          <div style={{ width, backgroundColor: bgColor, borderRadius: round }}>
            {children}
          </div>
        </div>
      </div> */}
      <Transition
        open={open}
        mode={options.mode}
        className={`fixed ${options.position} z-10 max-h-full overflow-y-auto`}
        style={{
          width: options.width,
          backgroundColor: bgColor,
          borderRadius: options.round,
        }}
      >
        {children}
      </Transition>
    </div>
  );
}
