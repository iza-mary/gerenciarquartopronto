import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./QuartoForm.css";

const QuartoForm = ({ onSave, onCancel, quartoAtual = null }) => {
  const [quarto, setQuarto] = useState({
    id: null,          
    numero: "",
    tipo: "",
    status: "Disponível",
    leitos: 1,
    andar: "",
    observacao: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (quartoAtual) {
      setQuarto({
        id: quartoAtual.id,          
        numero: quartoAtual.numero,
        tipo: quartoAtual.tipo,
        status: quartoAtual.status,
        leitos: quartoAtual.leitos,
        andar: quartoAtual.andar,
        observacao: quartoAtual.observacao || "",
      });
    }
  }, [quartoAtual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuarto((prev) => ({
      ...prev,
      [name]: name === "leitos" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onSave(quarto);
    setValidated(false);

    if (!quartoAtual) {
      setQuarto({
        id: null,
        numero: "",
        tipo: "",
        status: "Disponível",
        leitos: 1,
        andar: "",
        observacao: "",
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Número do Quarto*</Form.Label>
            <Form.Control
              type="text"
              name="numero"
              value={quarto.numero}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Informe o número do quarto.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Andar*</Form.Label>
            <Form.Select
              name="andar"
              value={quarto.andar}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="1">1º Andar</option>
              <option value="2">2º Andar</option>
              <option value="3">3º Andar</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione o andar.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tipo de Quarto*</Form.Label>
            <Form.Select
              name="tipo"
              value={quarto.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Individual">Individual</option>
              <option value="Coletivo">Coletivo</option>
              <option value="Especial">Especial</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione o tipo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Número de Leitos*</Form.Label>
            <Form.Control
              type="number"
              name="leitos"
              min="1"
              value={quarto.leitos}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Informe os leitos.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Status*</Form.Label>
            <Form.Select
              name="status"
              value={quarto.status}
              onChange={handleChange}
              required
            >
              <option value="Disponível">Disponível</option>
              <option value="Ocupado">Ocupado</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Descrição/Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="observacao"
              value={quarto.observacao}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {quartoAtual ? "Atualizar Quarto" : "Salvar Quarto"}
        </Button>
      </div>
    </Form>
  );
};

export default QuartoForm;
