export declare const failure: (res: any, error: any, status?: number) => any;
export declare const success: (res: any, data: any) => any;
export declare const InvalidRouteError: Error;
export declare const Unauthorized: Error;
export declare const BookedOut: Error;
export declare const AddDuplicateItemError: Error;
export declare const RemoveBookedItemError: Error;
export declare const RemoveNonExistingItemError: Error;
export declare const InvalidId: (id: any) => Error;
