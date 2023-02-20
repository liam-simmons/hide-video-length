import { z } from 'zod';

export function zParse<T>(schema: z.ZodType<T, z.ZodTypeDef, T>, candidate: unknown): T | false {
  const parsed = schema.safeParse(candidate);

  return parsed.success && parsed.data;
}

export function zValidate<T>(schema: z.ZodType<T, z.ZodTypeDef, T>, candidate: unknown): candidate is T {
  return schema.safeParse(candidate).success;
}

export class ZodWrapper<Type> {
  schema: z.ZodType<Type, z.ZodTypeDef, Type>;

  constructor(schema: z.ZodType<Type, z.ZodTypeDef, Type>) {
    this.schema = schema;
  }

  validate(candidate: unknown): candidate is Type {
    return this.schema.safeParse(candidate).success;
  }

  validateArray(candidate: unknown): candidate is Type[] {
    return this.schema.array().safeParse(candidate).success;
  }
}
