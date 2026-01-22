import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export interface QueryOptions {
  search?: string;
  searchFields?: string[];
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
  order?: Record<string, 'ASC' | 'DESC'>;
}

export function applyQueryOptions<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  options: QueryOptions,
): SelectQueryBuilder<T> {
  const {
    search,
    searchFields,
    filters,
    page = 1,
    limit = 10,
    order,
  } = options;

  if (search && searchFields?.length) {
    const conditions = searchFields.map((field, i) => {
      const param = `search${i}`;
      qb.setParameter(param, `%${search}%`);
      return `${field} ILIKE :${param}`;
    });
    qb.andWhere(conditions.join(' OR '));
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value) && value.length) {
        qb.andWhere(`${key} IN (:...${key})`, { [key]: value });
      } else {
        qb.andWhere(`${key} = :${key}`, { [key]: value });
      }
    });
  }

  qb.take(limit).skip(limit * (page - 1));

  if (order) {
    Object.entries(order).forEach(([field, direction]) => {
      qb.addOrderBy(field, direction);
    });
  }

  return qb;
}
