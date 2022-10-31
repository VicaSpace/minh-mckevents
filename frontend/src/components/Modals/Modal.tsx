// @src/components/Modal.jsx
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  customActionSection?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  closeModal,
  customActionSection,
}) => {
  return (
    <>
      {isOpen && (
        <>
          <div className={styles.darkBG} onClick={() => closeModal()} />
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>{title}</h5>
              </div>
              <button className={styles.closeBtn} onClick={() => closeModal()}>
                <RiCloseLine style={{ marginBottom: '-3px' }} />
              </button>
              <div className={styles.modalContent}>{children}</div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  {customActionSection ?? (
                    <>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
