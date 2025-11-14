import axios from 'axios';

export async function fetchAddressByCEP(cep) {
  try {
    const sanitized = (cep || '').replace(/\D/g, '');
    if (sanitized.length !== 8) throw new Error('CEP inválido');
    const url = `https://viacep.com.br/ws/${sanitized}/json/`;
    const resp = await axios.get(url);
    if (resp.data && resp.data.erro) throw new Error('CEP não encontrado');
    return {
      logradouro: resp.data.logradouro || '',
      bairro: resp.data.bairro || '',
      localidade: resp.data.localidade || '',
      uf: resp.data.uf || ''
    };
  } catch (error) {
    throw error;
  }
}
