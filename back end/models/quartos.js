class Quarto {
  constructor(data) {
    this.id = data.id || null;
    this.numero = data.numero;
    this.tipo = data.tipo;
    this.leitos = data.leitos;
    this.ocupacao = data.ocupacao ?? 0;
    this.status = data.status || 'Disponível';
    this.andar = data.andar;
    this.observacao = data.observacao || null;
  }

  validate() {
    const errors = [];

    if (!this.numero || isNaN(this.numero)) {
      errors.push('Número do quarto é obrigatório e deve ser numérico');
    }

    if (!this.tipo || this.tipo.trim().length === 0) {
      errors.push('Tipo é obrigatório');
    }

    if (!this.leitos || isNaN(this.leitos)) {
      errors.push('Número de leitos é obrigatório e deve ser numérico');
    }

    if (this.ocupacao === undefined || isNaN(this.ocupacao)) {
      errors.push('Ocupação deve ser numérica');
    }

    const validStatus = ['Disponível', 'Ocupado'];
    if (!validStatus.includes(this.status)) {
      errors.push('Status inválido');
    }

    if (!this.andar || isNaN(this.andar)) {
      errors.push('Andar é obrigatório e deve ser numérico');
    }

    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      numero: this.numero,
      tipo: this.tipo,
      leitos: this.leitos,
      ocupacao: this.ocupacao,
      status: this.status,
      andar: this.andar,
      observacao: this.observacao
    };
  }
}

module.exports = Quarto;
