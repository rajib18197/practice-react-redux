const API_URL = "http://localhost:9000";

export async function getAllJobs() {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) {
    const error = new Error("Jobs could not be found");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function createJob(jobData) {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const error = new Error("Job could not be created");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}
