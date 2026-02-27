export type MetadataFieldConfig = {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
};

export type SubcategoryMetadataConfig = {
  fields: MetadataFieldConfig[];
};

export const SUBCATEGORY_METADATA_CONFIG: Record<
  string,
  SubcategoryMetadataConfig
> = {
  fudbal: {
    fields: [
      {
        key: 'homeTeam',
        label: 'Domaćin',
        type: 'string',
        required: true,
      },
      {
        key: 'awayTeam',
        label: 'Gost',
        type: 'string',
        required: true,
      },
      {
        key: 'referee',
        label: 'Sudija',
        type: 'string',
        required: false,
      },
    ],
  },
  kosarka: {
    fields: [
      {
        key: 'homeTeam',
        label: 'Domaći tim',
        type: 'string',
        required: true,
      },
      {
        key: 'awayTeam',
        label: 'Gostujući tim',
        type: 'string',
        required: true,
      },
      {
        key: 'referee',
        label: 'Sudija',
        type: 'string',
        required: false,
      },
      {
        key: 'competition',
        label: 'Takmičenje',
        type: 'string',
        required: false,
      },
    ],
  },
  koncert: {
    fields: [
      {
        key: 'performer',
        label: 'Izvođač',
        type: 'string',
        required: true,
      },
      {
        key: 'genre',
        label: 'Žanr',
        type: 'string',
        required: false,
      },
    ],
  },
  konferencija: {
    fields: [
      {
        key: 'speaker',
        label: 'Predavač',
        type: 'string',
        required: true,
      },
      {
        key: 'topic',
        label: 'Tema',
        type: 'string',
        required: true,
      },
    ],
  },
};
