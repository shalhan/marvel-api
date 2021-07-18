import { Character } from "../models";

export interface GetCharacterById {
    getCharacterById(id: number): Promise<Character>;
  }
  