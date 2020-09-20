import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const APIGateway = axios.create({
  baseURL: 'https://epdxbtju23.execute-api.us-west-2.amazonaws.com/prod',
  headers,
});

export const getOrgs = async ({ authToken }) => {
  try {
    const { data } = await APIGateway.get('/orgs', {
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
