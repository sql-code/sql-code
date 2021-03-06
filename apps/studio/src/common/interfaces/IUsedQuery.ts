
export default interface IUsedQuery {
  id: number | null
  text: string
  createdAt: Date | number | null
  updatedAt: Date | number | null
  connectionId: number | null
  queryId: number | null
}