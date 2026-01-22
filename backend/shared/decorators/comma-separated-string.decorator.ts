import { Transform } from 'class-transformer';

export function CommaSeparatedStringArray() {
  return Transform(({ value }: { value: string | string[] }) => {
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return Array.isArray(value) ? value : [];
  });
}
