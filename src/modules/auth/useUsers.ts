import { ref } from 'vue';
import type { User } from '../../interfaces/interfaces.ts'

export const useUsers = () => {
  const token = ref<string | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const users = ref<User | null>(null);
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const password = ref<string | null>(null);
  const registerDate = ref<string | null>(null);
}
