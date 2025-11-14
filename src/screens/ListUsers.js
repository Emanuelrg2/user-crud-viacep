import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import UserItem from '../components/UserItem';
import { loadUsers, saveUsers } from '../service/storage';

export default function ListUsers({ navigation }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchUsers() {
    try {
      const data = await loadUsers();
      setUsers(data || []);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchUsers);
    fetchUsers();
    return unsubscribe;
  }, [navigation]);

  const handleAdd = () => {
    navigation.navigate('UserForm', { mode: 'add' });
  };

  const handleEdit = (user) => {
    navigation.navigate('UserForm', { mode: 'edit', user });
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedUser) return;
    try {
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      await saveUsers(updatedUsers);
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => confirmDelete(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>Nenhum usuário cadastrado.</Text>
          </View>
        )}
      />

      { }
      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Text style={{ fontSize: 26, color: '#fff' }}>+</Text>
      </TouchableOpacity>

      { }
      <Modal
        transparent
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Excluir usuário</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir{' '}
              <Text style={{ fontWeight: 'bold' }}>{selectedUser?.nome}</Text>?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setShowModal(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#F44336' }]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={{ color: '#fff' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2196F3',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 12,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
});
