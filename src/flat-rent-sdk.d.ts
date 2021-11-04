declare module "flat-rent-sdk" {
  export interface IParams {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit?: number;
  }

  export function cloneDate(date: any): Date;
  export function addDays(date: any, days: any): any;
  export const backendPort: 3030;
  export const localStorageKey: "flat-rent-db";
  export class FlatRentSdk {
    database: any;

    get(id: string): Promise<Object | null>;

    search(parameters: IParams): Object[];

    book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
    _assertDatesAreCorrect(checkInDate: any, checkOutDate: any): void;
    _resetTime(date: any): void;
    _calculateDifferenceInDays(startDate: any, endDate: any): number;
    _generateDateRange(from: any, to: any): Date[];
    _generateTransactionId: () => number;
    _areAllDatesAvailable(flat: any, dateRange: any): any;
    _formatFlatObject(flat: any, nightNumber: any): any;
    _readDatabase(): any;
    _writeDatabase(database: any): void;
    _syncDatabase(database: any): void;
  }
}
