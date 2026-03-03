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
        key: 'speakers',
        label: 'Predavači',
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
  degustacija_vina: {
    fields: [
      {
        key: 'winery',
        label: 'Vinarija / Proizvođač',
        type: 'string',
        required: true,
      },
      {
        key: 'sommelier',
        label: 'Somelijer (Predavač)',
        type: 'string',
        required: false,
      },
      {
        key: 'wineCount',
        label: 'Broj uzoraka za degustaciju',
        type: 'number',
        required: false,
      },
    ],
  },

  kulinarska_radionica: {
    fields: [
      {
        key: 'chef',
        label: 'Glavni šef',
        type: 'string',
        required: true,
      },
      {
        key: 'cuisineType',
        label: 'Tip kuhinje (npr. Italijanska)',
        type: 'string',
        required: true,
      },
      {
        key: 'difficulty',
        label: 'Težina (1-5)',
        type: 'number',
        required: false,
      },
    ],
  },
  festival: {
    fields: [
      {
        key: 'headliners',
        label: 'Glavni izvođači',
        type: 'string',
        required: true,
      },
      {
        key: 'festivalType',
        label: 'Tip festivala (Muzički, Filmski, Gastro...)',
        type: 'string',
        required: true,
      },
      {
        key: 'durationDays',
        label: 'Trajanje (broj dana)',
        type: 'number',
        required: true,
      },
      {
        key: 'stageCount',
        label: 'Broj bina / zona',
        type: 'number',
        required: false,
      },
    ],
  },
};
