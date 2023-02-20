import Browser from 'webextension-polyfill';

export function getURL(): string {
  return Browser.runtime.getURL('options.html');
}
