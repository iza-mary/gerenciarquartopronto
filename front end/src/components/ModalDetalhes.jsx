import { Modal, Button } from "react-bootstrap";

const ModalDetalhes = ({ show, onHide, quarto }) => {
  const observacao = quarto?.observacao?.trim();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Observações</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="fs-5">
          {observacao ? observacao : <span className="text-muted">Sem observações.</span>}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalhes;
