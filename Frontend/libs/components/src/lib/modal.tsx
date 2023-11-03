import { useModalContext } from '@da-tokenization/providers';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const AppModal = () => {
  const { modal } = useModalContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    setOpenModal(!!modal);
  }, [modal]);

  return (
    <Modal size="lg" show={openModal}>
      {/* <Modal.Header>Transaction Hash</Modal.Header> */}
      {/* <Button onClick={() => setOpenModal(false)} className="btnTop">
        x
      </Button> */}
      <Modal.Body>{modal?.component}</Modal.Body>
      <Modal.Footer>
        <Button className="closeBtn" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
