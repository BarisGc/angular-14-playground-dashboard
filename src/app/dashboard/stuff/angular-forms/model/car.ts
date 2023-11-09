export interface Car {
  id: number;
  name: string;
  nested: {
    countryId: string;
    name: string;
  };
}
