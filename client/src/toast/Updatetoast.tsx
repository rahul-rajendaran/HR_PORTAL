import React from 'react'
import { Toast } from 'react-bootstrap';
interface IToastProps {
    message: string;
    onClose: () => void;
  }
const Updatetoast = ({ message, onClose }:IToastProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >

    <Toast onClose={onClose} show={true} delay={3000} autohide style={{ background: '#1df268',color:"white" }} >
    <Toast.Body  style={{ textAlign: 'center' }}>{message}</Toast.Body>
  </Toast>
    </div>
  )
}

export default Updatetoast