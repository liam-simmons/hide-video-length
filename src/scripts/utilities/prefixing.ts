const thePrefix = process.env.PREFIX || '';

export function getPrefix() {
  return thePrefix;
}

export function prefix(toPrefix: string) {
  return thePrefix + toPrefix;
}

export function removePrefix(toRemovePrefix: string) {
  return toRemovePrefix.replace(thePrefix, '');
}
