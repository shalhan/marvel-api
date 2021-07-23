export interface GetAllCharacter {
  getAllCharactersId(): Promise<number[]>;
}

export interface GetAllCharacterWithTotal extends GetAllCharacter {
  getTotalCharacters(): Promise<number>;
}
