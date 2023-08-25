export type SelectWrapper<T extends string | number | boolean> = {
  label: string;
  value: T;
};
