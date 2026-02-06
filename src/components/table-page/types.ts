export interface PapuddingTablePageProps {
  tableName: string,
  page?: number,
  pageSize?: number,
  total?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableIcon?: any,
  searchCollapse?: boolean,
  pagination?: boolean,
}