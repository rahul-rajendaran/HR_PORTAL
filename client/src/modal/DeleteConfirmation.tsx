import React from "react";
import { Modal, Button } from "react-bootstrap";
interface Props {
  showModal: boolean;
  hideModal: () => void;
  confirmModal: (id: any) => {};
  id?: string;
  type: string;
  message: string;
}

const DeleteConfirmation: React.FC<Props> = ({
  showModal,
  hideModal,
  confirmModal,
  id = "",
  type,
  message,
}) => {
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">{message}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
