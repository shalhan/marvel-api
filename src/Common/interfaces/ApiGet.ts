import { ApiFilter } from "../models";

export interface ApiGet<T> {
  get(endpoint: string, filter?: ApiFilter): Promise<T>;
}
