import { PaginationMeta } from './pagination-meta';
import { PaginationResult } from './pagination-result';

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const meta = new PaginationMeta(total, page, limit);
  return new PaginationResult<T>(data, meta);
}
