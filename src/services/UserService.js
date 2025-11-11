import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_list';

export const getUsers = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
};

const saveUsers = async (users) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Erro ao salvar usuários:', error);
    }
};

export const saveUser = async (user) => {
    const users = await getUsers();
    if (user.id) {
        const index = users.findIndex(u => u.id === user.id);
        if (index > -1) {
            users[index] = user;
        }
    } else {
        const newUser = { ...user, id: Date.now().toString() }; // ID simples
        users.push(newUser);
    }
    await saveUsers(users);
};

export const deleteUser = async (userId) => {
    const users = await getUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    await saveUsers(updatedUsers);
};