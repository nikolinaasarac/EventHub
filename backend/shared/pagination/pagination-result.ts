import { PaginationMeta } from './pagination-meta';

export class PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;

  constructor(data: T[], meta: PaginationMeta) {
    this.data = data;
    this.meta = meta;
  }
}
