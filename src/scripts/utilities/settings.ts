import Browser from 'webextension-polyfill';
import { UnknownObject } from '../types/general';
import { getPrefix, prefix, removePrefix } from './prefixing';

export async function get(key: string) {
  const prefixedKey = prefix(key);

  const settingObject = await getLocalStorageValue(prefixedKey);

  return settingObject && prefixedKey in settingObject ? settingObject[prefixedKey] : null;
}

export async function set(key: string, value: unknown) {
  return await Browser.storage.local.set({ [prefix(key)]: value });
}

export async function getAll() {
  const allSettings = await getLocalStorageValue();

  const ours: UnknownObject = {};

  if (allSettings) {
    for (const key of Object.keys(allSettings)) {
      if (key.startsWith(getPrefix())) {
        ours[removePrefix(key)] = allSettings[key];
      }
    }
  }

  return ours;
}

export async function getLocalStorageValue(key: string | null = null) {
  return Browser.storage.local.get(key);
}
