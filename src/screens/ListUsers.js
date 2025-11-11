import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUsers, deleteUser } from '../services/UserService';

export default function ListUsers({ navigation }) {
    const [users, setUsers] = useState([]);

    const loadUsers = useCallback(async () => {
        const list = await getUsers();
        setUsers(list);
    }, []);

    useFocusEffect(loadUsers);

    const handleDelete = async (id) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este usuário?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        await deleteUser(id);
                        loadUsers();
                        Alert.alert('Sucesso', 'Usuário excluído com sucesso.');
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View >
            <Text>{item.nomeCompleto} - {item.cidade}/{item.uf}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserForm', { user: item })}>
                <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Nenhum usuário cadastrado.</Text>}
            />
            { }
            <TouchableOpacity
                onPress={() => navigation.navigate('UserForm')}
                style={"/"}>
                <Text style={{ fontSize: 24, color: 'white' }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}