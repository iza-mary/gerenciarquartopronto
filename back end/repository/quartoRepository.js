const db = require('../confg/database');
const Quarto = require('../models/quartos');

class QuartoRepository {
  async findAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM quartos');
      return rows.map(row => new Quarto(row));
    } catch (error) {
      throw new Error(`Erro ao buscar quartos: ${error.message}`);
    }
  }

  async findByTipo(tipo) {
    try {
      const [rows] = await db.execute('SELECT * FROM quartos WHERE tipo = ?', [tipo]);
      return rows.map(row => new Quarto(row));
    } catch (error) {
      throw new Error(`Erro ao buscar quartos por tipo: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM quartos WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      return new Quarto(rows[0]);
    } catch (error) {
      throw new Error(`Erro ao buscar quarto por ID: ${error.message}`);
    }
  }

  async findByStatus(status) {
    try {
      const [rows] = await db.execute('SELECT * FROM quartos WHERE status = ?', [status]);
      return rows.map(row => new Quarto(row));
    } catch (error) {
      throw new Error(`Erro ao buscar quartos por status: ${error.message}`);
    }
  }

  async create(data) {
    const quarto = new Quarto(data);
    const errors = quarto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const observacaoFinal = quarto.observacao !== undefined ? quarto.observacao : null;

    try {
      const [result] = await db.execute(
        'INSERT INTO quartos (numero, tipo, leitos, ocupacao, status, andar, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          quarto.numero,
          quarto.tipo,
          quarto.leitos,
          quarto.ocupacao,
          quarto.status,
          quarto.andar,
          observacaoFinal
        ]
      );
      quarto.id = result.insertId;
      return quarto;
    } catch (error) {
      throw new Error(`Erro ao inserir quarto: ${error.message}`);
    }
  }

  async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Quarto não encontrado para atualização');
    }

    const quarto = new Quarto({ ...data, id });
    const errors = quarto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const observacaoFinal = quarto.observacao !== undefined ? quarto.observacao : null;

    try {
      await db.execute(
        'UPDATE quartos SET numero = ?, tipo = ?, leitos = ?, ocupacao = ?, status = ?, andar = ?, observacao = ? WHERE id = ?',
        [
          quarto.numero,
          quarto.tipo,
          quarto.leitos,
          quarto.ocupacao,
          quarto.status,
          quarto.andar,
          observacaoFinal,
          id
        ]
      );

      
      const atualizado = await this.findById(id);
      return atualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar quarto: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const [result] = await db.execute('DELETE FROM quartos WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error('Quarto não encontrado para exclusão');
      }
    } catch (error) {
      throw new Error(`Erro ao excluir quarto: ${error.message}`);
    }
  }
}

module.exports = new QuartoRepository();
