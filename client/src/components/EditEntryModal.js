import React from "react";
import ReactDOM from "react-dom";

/**
 * Component for modal.
 */
function Modal({ children, open }) {
  return (
    open &&
    ReactDOM.createPortal(
      <div className="modal">{children}</div>,
      document.body
    )
  );
}

export default Modal;
