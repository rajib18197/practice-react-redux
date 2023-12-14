const API_URL = "http://localhost:9000";

export async function getAllProductsApi() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function getProductApi(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createProductApi(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export default async function updateProductApi({ id, productData }) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function deleteProductApi(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = {};
    error.code = response.statusCode;
    error.info = await response.json();
    throw error;
  }

  return true;
}
