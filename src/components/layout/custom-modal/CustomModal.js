import { Backdrop, Fade, Modal } from '@mui/material';
import React from 'react';
import styles from './CustomModal.module.scss';

function CustomModal({ isOpen, handleClose, children }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <div className={styles.content}>{children}</div>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
