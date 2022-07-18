import ReactDOM from 'react-dom';
import { X } from 'react-feather';
import classes from './Modal.module.css';

const Modal = (props) => {
  const { isOpen, children, closeModal } = props;
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} />
      <div className={classes.modal}>
        <X size={48} className={classes.close} onClick={closeModal} />
        {children}
        <button className={classes.submit} onClick={closeModal}>
          submit
        </button>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
