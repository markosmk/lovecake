export type GooContent = {
  Id: string;
  Name: string;
  Type: string;
  Cost: string;
  Cant: string;
  Available: string;
  Price: string;
  Description: string;
};

export type GooElement = {
  id: string;
  name: string;
  cost: number;
  cant: number;
  description: string;
  price: number;
  disabled: boolean;
};
