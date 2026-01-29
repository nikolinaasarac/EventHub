import { Transform } from 'class-transformer';

export function EmptyStringToNull() {
  return Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return null;
    }
    return value;
  });
}