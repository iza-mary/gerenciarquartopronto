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
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const quarto = new Quarto(req.body);
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
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const quarto = new Quarto({ ...req.body, id });
      const errors = quarto.validate();

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          errors
        });
      }

      const updated = await quartoRepository.update(id, quarto);
      res.json({ success: true, data: updated.toJSON() });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await quartoRepository.delete(id);
      res.json({ success: true, message: 'Quarto excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new QuartosController();
