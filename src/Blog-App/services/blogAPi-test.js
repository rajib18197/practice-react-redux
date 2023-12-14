const API_URL = "http://localhost:9000";

export const getAllBlogs = async function ({ filter, sortBy }) {
  let url = `${API_URL}/blogs`;

  if (filter && sortBy) {
    url += `?${filter.filterField}=${filter.value}&_sort=${sortBy.field}&_order=${sortBy.direction}`;
  }

  if (filter && !sortBy) {
    url += `?${filter.filterField}=${filter.value}`;
  }

  if (sortBy && !filter) {
    url += `?_sort=${sortBy.field}&_order=${sortBy.direction}`;
  }
  console.log(url);
  const response = await fetch(url);
  console.log(response);
  if (!response.ok) {
    const error = {};
    error.status = response.statusCode;
    error.info = await response.json();
    console.log(error);
    throw error;
  }

  console.log(11);

  const data = await response.json();
  return data;
};
