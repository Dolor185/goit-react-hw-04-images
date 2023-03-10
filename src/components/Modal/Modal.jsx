import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BackDrop, Box } from './Modal.styled';

export const Modal = ({ onClose, modalImg }) => {
  useEffect(() => {
    const handleClose = e => {
      e.code === 'Escape' && onClose();
    };

    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    e.target === e.currentTarget && onClose();
  };

  return (
    <BackDrop onClick={onBackdropClick}>
      <Box>
        <img src={modalImg} alt="" />
      </Box>
    </BackDrop>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};
