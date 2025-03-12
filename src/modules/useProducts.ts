import { ref } from 'vue';
import type { Product } from '../interfaces/interfaces.ts'

export const useProducts = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const products = ref<Product[]>([]);

  const fetchProducts = async (): Promise<void> => {
    loading.value = true;
    try {
      error.value = null;
      const response = await fetch('https://ments-restapi.onrender.com/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      products.value = data;
      console.log("Products fetched:", products.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };
  return {
    products,
    error,
    loading,
    fetchProducts
  };

  fetchProducts();
};
