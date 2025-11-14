import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { loadUsers, saveUsers } from '../service/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function UserForm({ navigation, route }) {
  const { mode, user } = route.params || {};
  const [form, setForm] = useState({
    id: '',
    nome: '',
    cpf: '',
    tel: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  useEffect(() => {
    if (mode === 'edit' && user) {
      setForm(user);
    }
  }, [mode, user]);

  function handleChange(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function buscarCEP() {
    const cep = form.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      Alert.alert('Erro', 'CEP inválido. Digite 8 números.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        return;
      }

      setForm({
        ...form,
        endereco: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        uf: response.data.uf,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP.');
      console.log(error);
    }
  }

  async function handleSave() {
    if (!form.nome.trim()) {
      Alert.alert('Validação', 'Nome é obrigatório');
      return;
    }
    if (!form.cpf.trim()) {
      Alert.alert('Validação', 'CPF é obrigatório');
      return;
    }

    try {
      const users = await loadUsers();

      if (mode === 'add') {
        const newUser = { ...form, id: uuidv4() };
        const newUsers = [newUser, ...users];
        await saveUsers(newUsers);
      } else {
        const updatedUsers = users.map(u => (u.id === form.id ? form : u));
        await saveUsers(updatedUsers);
      }

      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Nome"
        value={form.nome}
        onChangeText={value => handleChange('nome', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={form.cpf}
        onChangeText={value => handleChange('cpf', value)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Telefone"
        value={form.tel}
        onChangeText={value => handleChange('tel', value)}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {}
      <View style={styles.cepContainer}>
        <TextInput
          placeholder="CEP"
          value={form.cep}
          onChangeText={value => handleChange('cep', value)}
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.buscarBtn} onPress={buscarCEP}>
          <Text style={styles.buscarText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={value => handleChange('endereco', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Bairro"
        value={form.bairro}
        onChangeText={value => handleChange('bairro', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Cidade"
        value={form.cidade}
        onChangeText={value => handleChange('cidade', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="UF"
        value={form.uf}
        onChangeText={value => handleChange('uf', value)}
        style={styles.input}
        maxLength={2}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 6,
    padding: 10,
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buscarBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buscarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
