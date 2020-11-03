import React, { useEffect, useState } from 'react';

/**
 * This react component is used to build modals.
 * This component has the properties to close the modal and display
 * the information passed to him.
 * @param props
 * @constructor
 */
const Modal: React.FC<{ hidden: boolean, maxWidth?: Number, hideCloseButton?: boolean, closeModal: () => void}> = (props) => {
  const [modalShow, setModalShow] = useState<string>('');
  const [display, setDisplay] = useState<string>('');
  const [hideCloseButton, setHideCloseButton] = useState<boolean>(false);

  const openModal = () => {
    setModalShow('show');
    setDisplay('block');
  };

  const closeModal = () => {
    setModalShow('');
    setDisplay('none');
    props.closeModal();
  };

  useEffect(() => {
    props.hidden ? closeModal() : openModal();
    if (props.hideCloseButton) {
      setHideCloseButton(true) 
    }
  });

  return (
    <div
      className={`modal fade ${modalShow}`}
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      style={{ display }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {!hideCloseButton && (
            <button type="button" className="close" onClick={() => closeModal()}>
              <span aria-hidden="true" className="close-modal-icon">&times;</span>
            </button>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
