export type ApiResponse<T> = {
    status: string
    data: T
    meta?: T
}