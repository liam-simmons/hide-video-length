export type UnknownObject = { [key: string]: unknown };

export function isObject(variable: unknown): variable is UnknownObject {
  return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
}
