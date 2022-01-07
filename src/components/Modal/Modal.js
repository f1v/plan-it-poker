import React from 'react'
import './Modal.scss';

const Modal = ({ show, children }) => (
  <div className={`modal display-${show ? "block" : "none"}`}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );


export default Modal
