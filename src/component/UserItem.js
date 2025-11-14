import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserItem({ user, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.small}>
          CPF: {user.cpf} • Tel: {user.tel || '-'}
        </Text>
        <Text style={styles.small}>
          {user.endereco
            ? `${user.endereco}${user.bairro ? ', ' + user.bairro : ''}`
            : 'Endereço não preenchido'}
        </Text>
        <Text style={styles.small}>
          {user.cidade || '-'} / {user.uf || '-'} • CEP: {user.cep || '-'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, { backgroundColor: '#F44336' }]}
        >
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  small: { color: '#555', fontSize: 12 },
  actions: { marginLeft: 10 },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
