export interface Map {
  _id?: string;
  name: string;
  imageFile: { [key: string]: any };
  mapData: object;
  lore: string;
}
