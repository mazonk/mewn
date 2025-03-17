import { ref } from 'vue';
import type { User } from '../../interfaces/interfaces.ts'

export const useUsers = () => {
  const token = ref<string | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const users = ref<User | null>(null);
  const name = ref<string>(' ');
  const email = ref<string>(' ');
  const password = ref<string>(' ');
  const registerDate = ref<string | null>(null);

  const fetchToken = async (email: string, password: string): Promise<void> => {
    try {
      error.value = null;
      const response = await fetch('https://ments-restapi.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('lsToken') || '',
        },
        body: JSON.stringify({ email, password }),
        });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse.error || 'Error');
        throw new Error('Failed to fetch token');
      }
      const authResponse = await response.json();
      token.value = authResponse.token;
      users.value = authResponse.user;
      isLoggedIn.value = true

      localStorage.setItem('lsToken', authResponse.data.token);
      localStorage.setItem('userIDToken', JSON.stringify(authResponse.data.user));
      console.log("Token fetched:", token.value);
    } catch (err) {
      error.value = (err as Error).message;
      isLoggedIn.value = false
    }
  };

  return {
    token,
    isLoggedIn,
    error,
    users,
    name,
    email,
    password,
    registerDate,
    fetchToken
  };
}
