export interface Document {
  _id?: string;
  name: string;
  content: string;
  lore: any;
  parent?: string;
}
