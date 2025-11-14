import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@users_app:v1';

export async function saveUsers(users) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
    throw error;
  }
}

export async function loadUsers() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    throw error;
  }
}
