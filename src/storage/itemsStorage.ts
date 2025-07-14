import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = '@comprar:items';

export type ItemStorage = {
  id: string;
  description: string;
  status: FilterStatus;
}

async function get(): Promise<ItemStorage[]> {
  try {
    const response = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return response ? JSON.parse(response) : [];
  } catch (error) {
    console.error("GET_ITEMS_ERROR", error);
    return [];
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get();
  return items.filter(item => item.status === status);
}

export const itemsStorage = {
  get,
  getByStatus,
}