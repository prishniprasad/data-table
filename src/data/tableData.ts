export type TableRow = {
  id: number;
  assetName: string;
  distributionId: string;
  creationDate: string;
  creationTime: string;
  distributionDate?: string;
  distributionTime?: string;
  platform: string | null;
  licenseRange?: string;
  distributionStatus: 'Completed' | 'Failed';
};

export const tableData: TableRow[] = [
  {
    id: 1,
    assetName: 'I M Inter - Season 2024/25',
    distributionId: '691b0d6014d713d50f22bf43',
    creationDate: '02 Mar, 2026',
    creationTime: '11:41:30 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'amagi TV',
    licenseRange: 'Jan 08, 2026 - Jan 08, 2126',
    distributionStatus: 'Completed',
  },
  {
    id: 2,
    assetName: 'El pozo',
    distributionId: '6901baeb2c0333f202ec1e17',
    creationDate: '05 Feb, 2026',
    creationTime: '15:52:37 IST',
    distributionDate: '05 Feb, 2026',
    distributionTime: '15:52:57 IST',
    platform: 'Plex',
    licenseRange: 'Jan 02, 2025 - Jan 02, 2045',
    distributionStatus: 'Failed',
  },
  {
    id: 3,
    assetName: 'Molly Moon and the Incredible Book of Hypnotism',
    distributionId: '69846f6dfb888686ac3def98',
    creationDate: '08 Jan, 2026',
    creationTime: '17:33:10 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'GoSee TV',
    licenseRange: 'Dec 02, 2025 - Dec 24, 2025',
    distributionStatus: 'Completed',
  },
  {
    id: 4,
    assetName: 'Tarzan',
    distributionId: '6916fae3e50327edf84da8a8',
    creationDate: '04 Dec, 2025',
    creationTime: '13:03:22 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'Plex',
    licenseRange: 'Jan 02, 2025 - Jan 02, 2045',
    distributionStatus: 'Failed',
  },
  {
    id: 5,
    assetName: 'The Moon Mission Part I',
    distributionId: '69846f6dfb888686ac3def98',
    creationDate: '04 Dec, 2025',
    creationTime: '12:30:24 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'Tubi',
    licenseRange: 'Dec 02, 2025 - Dec 24, 2025',
    distributionStatus: 'Failed',
  },
  {
    id: 6,
    assetName: 'The Good Lie',
    distributionId: '6912e18f618d433f767a42d7',
    creationDate: '03 Dec, 2025',
    creationTime: '13:39:02 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'Tubi',
    licenseRange: 'Dec 02, 2025 - Dec 24, 2025',
    distributionStatus: 'Failed',
  },
  {
    id: 7,
    assetName: 'Homecoming',
    distributionId: '690d956a618d433f767a412e',
    creationDate: '17 Nov, 2025',
    creationTime: '15:52:37 IST',
    distributionDate: undefined,
    distributionTime: undefined,
    platform: 'amagi TV',
    licenseRange: 'Nov 17, 2025 - Nov 17, 2125',
    distributionStatus: 'Completed',
  },
  {
    id: 8,
    assetName: 'A Little Extra Health',
    distributionId: '69846f6dfb888686ac3def98',
    creationDate: '17 Nov, 2025',
    creationTime: '13:03:22 IST',
    distributionDate: '04 Dec, 2025',
    distributionTime: '12:59:16 IST',
    platform: 'Plex',
    licenseRange: 'Jan 02, 2025 - Jan 02, 2045',
    distributionStatus: 'Completed',
  },
];
