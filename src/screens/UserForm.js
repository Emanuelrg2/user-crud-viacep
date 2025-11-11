import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { saveUser } from '../services/UserService';
import { fetchAddressByCep } from '../services/ViaCepService';

export default function UserForm({ navigation, route }) {
    const initialUser = route.params?.user || {
        nomeCompleto: '',
        telefone: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
    };
    const [user, setUser] = useState(initialUser);
    const isEditing = !!route.params?.user;

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Usuário' : 'Novo Usuário'
        });
    }, [isEditing, navigation]);

    useEffect(() => {
        const handleCepChange = async () => {
            if (user.cep.length === 8) {
                const address = await fetchAddressByCep(user.cep);
                if (address) {
                    setUser(prev => ({
                        ...prev,
                        logradouro: address.logradouro,
                        bairro: address.bairro,
                        cidade: address.cidade,
                        uf: address.uf,
                    }));
                } else {
                    Alert.alert('Erro', 'CEP não encontrado ou inválido.');
                }
            }
        };
        const timeoutId = setTimeout(handleCepChange, 500);
        return () => clearTimeout(timeoutId);
    }, [user.cep]);

    const handleChange = (name, value) => {
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!user.nomeCompleto || !user.cep) {
            Alert.alert('Erro', 'Nome e CEP são obrigatórios.');
            return;
        }

        await saveUser(user);
        Alert.alert('Sucesso', isEditing ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
                style={styles.input}
                value={user.nomeCompleto}
                onChangeText={(text) => handleChange('nomeCompleto', text)}
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                value={user.telefone}
                onChangeText={(text) => handleChange('telefone', text)}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
                style={styles.input}
                value={user.cpf}
                onChangeText={(text) => handleChange('cpf', text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>CEP</Text>
            <TextInput
                style={styles.input}
                value={user.cep}
                onChangeText={(text) => handleChange('cep', text)}
                keyboardType="numeric"
                maxLength={8}
            />

            <Text style={styles.label}>Logradouro</Text>
            <TextInput
                style={styles.input}
                value={user.logradouro}
                onChangeText={(text) => handleChange('logradouro', text)}
                editable={false}
            />

            <Text style={styles.label}>Bairro</Text>
            <TextInput
                style={styles.input}
                value={user.bairro}
                onChangeText={(text) => handleChange('bairro', text)}
                editable={false}
            />

            <Text style={styles.label}>Cidade</Text>
            <TextInput
                style={styles.input}
                value={user.cidade}
                onChangeText={(text) => handleChange('cidade', text)}
                editable={false}
            />

            <Text style={styles.label}>UF (Estado)</Text>
            <TextInput
                style={styles.input}
                value={user.uf}
                onChangeText={(text) => handleChange('uf', text)}
                editable={false}
            />

            <Button title="Salvar" onPress={handleSave} color="#007AFF" />
            <View style={{ height: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});