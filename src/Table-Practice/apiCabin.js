const API_URL = "http://localhost:9000";
export async function getCabins() {
  const response = await fetch(`${API_URL}/cabins`);
  if (!response.ok) {
    const error = {};
    error.status = error.statusCode;
    error.info = await error.json();
    throw error;
  }

  const data = await response.json();
  return data;
}
