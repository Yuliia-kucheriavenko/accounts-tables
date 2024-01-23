export function getUsers(): Promise<[]> {
  return fetch("http://localhost:5173/api/user.json")
    .then((response) => {
      if (!response.ok) {
        console.log("thrue");
      }
      return response.json();
    });
}
