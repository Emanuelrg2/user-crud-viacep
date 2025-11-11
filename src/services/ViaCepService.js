import axios from 'axios';

export const fetchAddressByCep = async (cep) => {
  const cleanCep = cep.replace(/\D/g, ''); 
  
  if (cleanCep.length !== 8) {
    return null;
  }
  
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
    
    if (response.data.erro) {
      return null;
    }

    return {
      logradouro: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.localidade,
      uf: response.data.uf,
    };
  } catch (error) {
    console.error('Erro na integração com ViaCEP:', error);
    return null;
  }
};