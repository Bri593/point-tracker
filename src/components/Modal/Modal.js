import { useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'react-feather';
import classes from './Modal.module.css';

const Modal = (props) => {
  const { isOpen, children, closeModal, addPoints } = props;
  if (!isOpen) return null;

  const [value, setValue] = useState(0);

  const options = [];
  for (var i = 0; i < 13; i++) {
    options.push(<option value={i}>{i}</option>);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} />
      <div className={classes.modal}>
        <X size={48} className={classes.close} onClick={closeModal} />
        {children}
        <select onChange={handleChange}>{options}</select>
        <button className={classes.submit} onClick={() => addPoints(value)}>
          {value}
        </button>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
