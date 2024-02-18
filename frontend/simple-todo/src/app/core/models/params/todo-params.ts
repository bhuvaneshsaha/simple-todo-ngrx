export class TodoParams {
  constructor(
    public pageNumber: number = 1,
    public pageSize: number = 10,
    public search: string = '',
    public sort: string = '',
    public order: string = ''
  ) {}
}
