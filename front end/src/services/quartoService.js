const API_BASE_URL = 'http://localhost:3001/api/quartos';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Erro na requisição');
  }
  return data;
};

const mapQuarto = (quarto) => ({
  ...quarto,
  observacao: quarto.observacao || '', 
  dailyValue: null, 
});

const getAll = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const result = await handleResponse(response);
    return result.data.map(mapQuarto);
  } catch (error) {
    console.error('Erro ao buscar quartos: ', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const result = await handleResponse(response);
    return mapQuarto(result.data);
  } catch (error) {
    console.error('Erro ao buscar quarto por ID: ', error);
    throw error;
  }
};

const add = async (quarto) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: quarto.numero,
        tipo: quarto.tipo,
        leitos: quarto.leitos,
        ocupacao: quarto.ocupacao ?? 0,
        status: quarto.status,
        andar: quarto.andar,
        observacao: quarto.observacao || null,
      }),
    });
    const result = await handleResponse(response);
    return mapQuarto(result.data);
  } catch (error) {
    console.error('Erro ao adicionar quarto: ', error);
    throw error;
  }
};

const update = async (id, quarto) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: quarto.numero,
        tipo: quarto.tipo,
        leitos: quarto.leitos,
        ocupacao: quarto.ocupacao ?? 0,
        status: quarto.status,
        andar: quarto.andar,
        observacao: quarto.observacao || null,
      }),
    });
    const result = await handleResponse(response);
    return mapQuarto(result.data);
  } catch (error) {
    console.error('Erro ao atualizar quarto: ', error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const result = await handleResponse(response);
    return result.message; 
  } catch (error) {
    console.error('Erro ao remover quarto: ', error);
    throw error;
  }
};

const quartoService = {
  getAll,
  getById,
  add,
  update,
  remove,
};

export default quartoService;
