import { Children, useEffect, useRef } from "react";
import { FaCross } from "react-icons/fa";
import { RxCross2, RxExit } from "react-icons/rx";

function Modal({ isOpen, closeModal, title, children }) {
  const modalDialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalDialog.current.showModal();
    } else {
      modalDialog.current.close();
    }
  }, [isOpen]);

  const handleClick = (e) => {
    const dialogDimensions = modalDialog.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  };

  return (
    <dialog
      className="
        w-72
        rounded-md
        p-4
        drop-shadow-lg 
        backdrop:bg-black/30
        dark:bg-gradient-to-br
        dark:from-[#18222b] 
        dark:to-[#05121a]
      "
      ref={modalDialog}
      onClick={(e) => handleClick(e)}
    >
      <div className="text-right">
        <button
          onClick={closeModal}
          type="button"
          className="[&>svg]:h-6 [&>svg]:w-6"
        >
          <RxCross2 className="text-green-600" />
        </button>
      </div>
      {title ? (
        <div className="mb-7 text-center">
          <h2 className="text-lg font-bold dark:text-white">{title}</h2>
        </div>
      ) : null}
      <div>{children}</div>
    </dialog>
  );
}

export default Modal;
