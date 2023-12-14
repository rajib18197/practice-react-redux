const API_URL = "http://localhost:9000";
const PAGE_SIZE = 5;
export async function getBlogsApi({ sortBy = {}, filter = {}, page = 1 }) {
  const { field: filterField, value } = filter;

  const { field: sortByField, direction } = sortBy;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE; // page * PAGE_SIZE
  const limit = to - from;

  let url = `${API_URL}/blogs?_page=${page}&_limit=${limit}`;

  if (filterField && sortByField) {
    url += `&${filterField}=${value}&_sort=${sortByField}&_order=${direction}`;
  }

  if (filterField && !sortByField) {
    url += `&${filterField}=${value}`;
  }

  if (sortByField && !filterField) {
    url += `&_sort=${sortByField}&_order=${direction}`;
  }

  console.log(url);

  const response = await fetch(url);
  console.log(response.headers.get("X-Total-Count"));

  if (!response.ok) {
    const error = {};
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return { data, length: response.headers.get("X-Total-Count") };
}

export async function getBlogApi(id) {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  if (!response.ok) {
    const error = {};
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createBlogApi(newData) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    const error = {};
    error.status = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  console.log(data);
  return data;
}
