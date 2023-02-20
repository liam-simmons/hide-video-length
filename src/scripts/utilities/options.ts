import Browser from 'webextension-polyfill';

export function getURL(): string {
  return Browser.runtime.getURL('build/options.html');
}
