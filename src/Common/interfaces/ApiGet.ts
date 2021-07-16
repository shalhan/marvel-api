export interface ApiGet<T> {
  get(endpoint: string): Promise<T>;
}
