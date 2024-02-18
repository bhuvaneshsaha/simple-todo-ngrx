export class TodoParams {
  constructor(
    public page: number = 1,
    public pageSize: number = 20,
    public search: string = '',
    public sort: string = '',
    public order: string = ''
  ) {}
}
