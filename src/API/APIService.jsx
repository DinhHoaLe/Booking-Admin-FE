const BASE_URL = "http://localhost:8080/api/v1"; // URL gốc của API

// Hàm xử lý lỗi chung
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
};

// Hàm GET Paganition
export const apiGet = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${BASE_URL}/refresh-token-admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const retryResponse = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return handleResponse(retryResponse);
      }
    }

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Hàm GET ALL
export const apiGetAll = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${BASE_URL}/refresh-token-admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const retryResponse = await fetch(`${BASE_URL}/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return handleResponse(retryResponse);
      }
    }

    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Hàm POST
export const apiPost = async (endpoint, body = {}) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Hàm POST Formdata
export const apiPostFormData = async (endpoint, body = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      body: body,
      credentials: "include",
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${BASE_URL}/refresh-token-admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const retryResponse = await fetch(`${BASE_URL}/${endpoint}`, {
          method: "POST",
          body: body,
          credentials: "include",
        });
        return handleResponse(retryResponse);
      }
    }
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Hàm PUT
export const apiPut = async (endpoint, body = {}) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Hàm PATCH
export const apiPatch = async (endpoint, body = {}) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Hàm PATCH Formdata
export const apiPatchFormData = async (endpoint, body = {}) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    body: body,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(`${BASE_URL}/refresh-token-admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const retryResponse = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PATCH",
        body: body,
        credentials: "include",
      });

      if (retryResponse.ok) {
        return handleResponse(retryResponse);
      }
    }
  }

  return handleResponse(response);
};

// Hàm DELETE
export const apiDelete = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return handleResponse(response);
};
