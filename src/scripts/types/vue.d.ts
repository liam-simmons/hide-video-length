// https://vuejs.github.io/vetur/guide/setup.html#typescript
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  type UnknownObject = { [key: string]: unknown };

  // @ts-ignore
  const component: DefineComponent<UnknownObject, UnknownObject, unknown>;

  export default component;
}
