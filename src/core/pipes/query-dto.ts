export class QueryDto {
  readonly currentPage = 1;
  readonly pageLimit?: number;
  readonly search?: string;
  readonly start?: Date;
  readonly end?: Date;
}
