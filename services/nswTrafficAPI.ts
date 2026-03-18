export async function fetchNSWIncidents() {
  const response = await fetch('http://localhost:3000/api/nsw-incidents');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
