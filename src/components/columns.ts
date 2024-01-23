interface ColumnDefinition {
  accessorKey: string;
  header: string;
}


export const columnDef: ColumnDefinition[] = [
  {
    accessorKey: 'accountId',
    header: 'AccountId',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'authTiken',
    header: 'AuthToken',
  },
  {
    accessorKey: 'creationDate',
    header: 'CreationDate',
  },
];

export const columnDefProfiles: ColumnDefinition[] = [
  {
    accessorKey: 'profieldId',
    header: 'ProfieldId',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'marketplace',
    header: 'Marketplace',
  },
]


export const columnDefCampaigns: ColumnDefinition[] = [
  {
    accessorKey: 'campaignId',
    header: 'CampaignId',
  },
  {
    accessorKey: 'clicks',
    header: 'Clicks',
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  }
]