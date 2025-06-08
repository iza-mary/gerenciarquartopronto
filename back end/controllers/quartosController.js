const quartoRepository = require('../repository/quartoRepository');
const Quarto = require('../models/quartos');

class QuartosController {
  async getAll(req, res) {
    try {
      const { status, tipo } = req.query;
      let quartos;

      if (status) {
        quartos = await quartoRepository.findByStatus(status);
      } else if (tipo) {
        quartos = await quartoRepository.findByTipo(tipo);
      } else {
        quartos = await quartoRepository.findAll();
      }

      res.json({
        success: true,
        data: quartos.map(q => q.toJSON()),
        total: quartos.length
      });
    } catch (error) {
      console.error('Erro no controller getAll:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { id, ...dados } = req.body;

      dados.status = 'Disponível';
      dados.ocupacao = 0;

      const quarto = new Quarto(dados);
      const errors = quarto.validate();

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          errors
        });
      }

      const created = await quartoRepository.create(quarto);
      res.status(201).json({ success: true, data: created.toJSON() });
    } catch (error) {
      console.error('Erro no controller create:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const dados = { ...req.body };
      delete dados.status;

      const quartoAtualizado = await quartoRepository.update(id, dados);
      res.json({ success: true, data: quartoAtualizado.toJSON() });
    } catch (error) {
      console.error('Erro no controller update:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await quartoRepository.delete(id);
      res.json({ success: true, message: 'Quarto excluído com sucesso!' });
    } catch (error) {
      console.error('Erro no controller delete:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new QuartosController();
