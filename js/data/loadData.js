export async function getUsers() {
    const res = await fetch('./js/data/mockData.json');
    const data = await res.json();
    return data.users;
  }
  