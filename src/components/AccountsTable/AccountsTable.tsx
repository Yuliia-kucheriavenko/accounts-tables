import Table from 'react-bootstrap/Table';

export const AccountsTable = () => {

  const users = [
    {
    accountId :1,
    email:"ahowis0@bandcamp.com",
    authTiken:"2afc:1a0d:6b1c:7615:d4e1:474:cf4c:99fc/1",
    creationDate:"14.09.2023"
  },
  {
    accountId :2,
    email:"ahowis0@bandcamp.com",
    authTiken:"2afc:1a0d:6b1c:7615:d4e1:474:cf4c:99fc/1",
    creationDate:"14.09.2023"
  },
  {
    accountId :3,
    email:"ahowis0@bandcamp.com",
    authTiken:"2afc:1a0d:6b1c:7615:d4e1:474:cf4c:99fc/1",
    creationDate:"14.09.2023"
  },
];
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>AccountId</th>
          <th>Email</th>
          <th>AuthToken</th>
          <th>CreationDate</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
        <tr key={user.accountId}>
          <td>{user.accountId}</td>
          <td>{user.email}</td>
          <td>{user.authTiken}</td>
          <td>{user.creationDate}</td>
      </tr>
          )}
      </tbody>
    </Table>
  );
}