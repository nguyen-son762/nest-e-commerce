export enum enumOrderStatus {
  ORDERING = 0,
  ORDERED = 1,
  PAID = 2,
  CANCELED = 3,
  PENDING = 4,
}
export type orderStatus =
  | enumOrderStatus.ORDERING
  | enumOrderStatus.ORDERED
  | enumOrderStatus.PAID
  | enumOrderStatus.CANCELED
  | enumOrderStatus.PENDING;
