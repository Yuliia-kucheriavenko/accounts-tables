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

