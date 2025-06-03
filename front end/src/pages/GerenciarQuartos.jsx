import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import QuartoForm from "../components/QuartoForm";
import QuartoLista from "../components/QuartoLista";
import ModalExcluir from "../components/ModalExcluir";
import QuartoVisaoGeral from "../components/QuartoVisaoGeral";
import ModalDetalhes from "../components/ModalDetalhes";
import quartoService from "../services/quartoService";
import "./GerenciarQuartos.css";

const GerenciarQuartos = () => {
  const [quartos, setQuartos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [quartoEditando, setQuartoEditando] = useState(null);
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  
  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await quartoService.getAll();
        setQuartos(dados);
      } catch (error) {
        console.error("Erro ao carregar quartos:", error);
      }
    };
    carregar();
  }, []);

  
  const handleSalvar = async (quarto) => {
    try {
      if (quartoEditando) {
        const atualizado = await quartoService.update(quartoEditando.id, quarto);
        setQuartos((prev) =>
          prev.map((q) => (q.id === atualizado.id ? atualizado : q))
        );
      } else {
        const salvo = await quartoService.add(quarto);
        setQuartos((prev) => [...prev, salvo]);
      }
      setMostrarForm(false);
      setQuartoEditando(null);
    } catch (error) {
      console.error("Erro ao salvar quarto:", error);
    }
  };


  const handleEditar = (quarto) => {
    setQuartoEditando(quarto);
    setMostrarForm(true);
  };


  const handleConfirmarExclusao = (id) => {
    setIdParaExcluir(id);
    setMostrarModalExcluir(true);
  };

  
  const handleExcluir = async () => {
    try {
      await quartoService.remove(idParaExcluir);
      setQuartos((prev) => prev.filter((q) => q.id !== idParaExcluir));
      setMostrarModalExcluir(false);
      setIdParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir quarto:", error);
    }
  };


  const handleView = (quarto) => {
    setQuartoSelecionado(quarto);
    setMostrarDetalhes(true);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Gerenciamento de Quartos</h1>
          <Button
            variant={mostrarForm ? "secondary" : "primary"}
            onClick={() => {
              setQuartoEditando(null);
              setMostrarForm(true);
            }}
          >
            Adicionar Quarto
          </Button>
        </Col>
      </Row>

      <Row className="secao-quartos">
        <Col>
          <QuartoVisaoGeral
            quartos={quartos}
            onDelete={handleConfirmarExclusao}
            onEdit={handleEditar}
            onView={handleView}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <QuartoLista
            quartos={quartos}
            onDelete={handleConfirmarExclusao}
            onEdit={handleEditar}
            onView={handleView}
          />
        </Col>
      </Row>

      {}
      <Modal
        show={mostrarForm}
        onHide={() => {
          setMostrarForm(false);
          setQuartoEditando(null);
        }}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {quartoEditando ? "Editar Quarto" : "Adicionar Novo Quarto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuartoForm
            onSave={handleSalvar}
            onCancel={() => {
              setMostrarForm(false);
              setQuartoEditando(null);
            }}
            quartoAtual={quartoEditando}
          />
        </Modal.Body>
      </Modal>

      {}
      <ModalExcluir
        show={mostrarModalExcluir}
        onHide={() => setMostrarModalExcluir(false)}
        onConfirm={handleExcluir}
      />

      {}
      <ModalDetalhes
        show={mostrarDetalhes}
        onHide={() => setMostrarDetalhes(false)}
        quarto={quartoSelecionado}
      />
    </Container>
  );
};

export default GerenciarQuartos;
