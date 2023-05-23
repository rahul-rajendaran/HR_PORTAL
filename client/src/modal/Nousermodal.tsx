import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  userModal: boolean;
  handleClose: () => void;
};

const Nousermodal: React.FC<Props> = ({ userModal, handleClose }) => {
  return (
    <Modal show={userModal}>
      <Modal.Header closeButton>
        <Modal.Title>Oops</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>No User Found!!!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Nousermodal;
