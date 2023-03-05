import Browser from 'webextension-polyfill';
import { UnknownObject } from '../types/general';
import { getPrefix, prefix, removePrefix } from './prefixing';

export async function get(key: string): Promise<unknown> {
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

export async function getLocalStorageValue(key: string | null = null): Promise<Record<string, unknown>> {
  return Browser.storage.local.get(key);
}

export async function addListener(
  variable: string | string[],
  callback: (setting: string, newValue: unknown, oldValue: unknown) => void,
): Promise<void> {
  if (typeof variable === 'string') {
    variable = [variable];
  }

  const variables = variable.map((element) => prefix(element));

  Browser.storage.local.onChanged.addListener((changes) => {
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (variables.includes(key)) {
        callback(removePrefix(key), newValue, oldValue);
      }
    }
  });
}
