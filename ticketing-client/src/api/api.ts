const API_BASE_URL = 'http://localhost:8080'; // Replace with your backend server URL

export async function getMovies() {
  const response = await fetch(`${API_BASE_URL}/api/movie/list`);
  return await response.json();
}

export async function getStandUpEvents() {
  const response = await fetch(`${API_BASE_URL}/api/standup/list`);
  return await response.json();
}
