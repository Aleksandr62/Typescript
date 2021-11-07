export function cloneDate(date: any): Date;
export function addDays(date: any, days: any): any;

export class FlatRentSdk {
  database: any;

  get(id: string): Promise<Object | null>;

  search(parameters: {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit: number | null;
  }): Object[];

  book(flatId: string, checkInDate: Date, checkOutDate: Date): number;
}
