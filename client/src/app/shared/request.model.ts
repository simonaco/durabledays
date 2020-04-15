export interface Request {
  url: string,
  payload: string,
  retry: number,
  scheduleDate: string,
  method: string,
  email: string
}
