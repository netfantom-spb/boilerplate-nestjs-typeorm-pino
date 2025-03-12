export interface ListItems<T> {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
    data: T[]
}