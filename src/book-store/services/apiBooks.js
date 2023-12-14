const API_URL = "http://localhost:9000";

export async function getBooks() {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    const error = {};
    error.responseCode = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function getBook(id) {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) {
    const error = {};
    error.responseCode = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createNewBook(newBook) {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    const error = {};
    error.responseCode = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function updateBook({ id, book }) {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const error = {};
    error.responseCode = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function deleteBook(id) {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = {};
    error.responseCode = response.status;
    error.info = await response.json();
    throw error;
  }

  return true;
}
