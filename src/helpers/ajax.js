import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const APIGateway = axios.create({
  baseURL: 'https://epdxbtju23.execute-api.us-west-2.amazonaws.com/prod',
  headers,
});

const getToken = (authData) => {
  const { idData: { jwtToken = '' } = {} } = authData;
  return jwtToken;
};

const getAuthHeaders = (authData) => ({
  ...headers,
  Authorization: `Bearer ${getToken(authData)}`,
});

export const getOrgs = async ({ authData }) => {
  try {
    const { data } = await APIGateway.get('/orgs', {
      headers: getAuthHeaders(authData),
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getConsumers = async ({ authToken }) => {
  try {
    const { data } = await APIGateway.get('/consumers', {
      headers: {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const addConsumer = async ({ authToken, body }) => {
  try {
    const { data } = await APIGateway.post('/consumers', body, {
      headers: {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const deleteConsumer = async ({ authData, id }) => {
  try {
    const { data } = await APIGateway.post(
      '/consumer-delete',
      { id },
      {
        headers: getAuthHeaders(authData),
      }
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getProperties = async ({ authToken, orgId }) => {
  try {
    const { data } = await APIGateway.get(`/properties?id=${orgId}`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const addProperty = async ({ authData, body }) => {
  try {
    const { data } = await APIGateway.post('/properties', body, {
      headers: getAuthHeaders(authData),
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const inviteAssignConsumer = async ({ authData, id, propertyId }) => {
  const body = propertyId ? { id, propertyId } : { id };
  try {
    const { data } = await APIGateway.post('/invite-assign', body, {
      headers: getAuthHeaders(authData),
    });
    return { data };
  } catch (error) {
    return { error };
  }
};
