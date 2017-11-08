// Modules
import MemoryStorage from 'memorystorage';
// Constants
import storage from '../constants/localStorage';

export const checkIsLocalStorageSupported = () => {
  try {
    storage.value.setItem(storage.testItemKey, storage.testItemKey);
    storage.value.removeItem(storage.testItemKey);
    return true;
  } catch (error) {
    return false;
  }
};

export const setupStorage = () => {
  storage.value = checkIsLocalStorageSupported()
    ? (storage.value)
    : (new MemoryStorage());
};

export const getItemFromStorage = (key) => {
  try {
    const stringifiedItem = storage.value.getItem(key);
    return JSON.parse(stringifiedItem);
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const safeItemToStorage = (key, value) => {
  try {
    const stringifiedItem = JSON.stringify(value);
    storage.value.setItem(key, stringifiedItem);
  } catch (err) {
    console.error(err);
  }
};
