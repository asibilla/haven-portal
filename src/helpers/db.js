import { DynamoDB } from 'aws-sdk';
import { forEach } from 'lodash';

import { region } from '../constants';

const getDocClient = (authData) => {
  const { awsConfig } = authData;
  awsConfig.credentials.clearCachedId();
  return new Promise((resolve, reject) => {
    awsConfig.credentials.get((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(new DynamoDB.DocumentClient({ region }));
      }
    });
  });
};

export const scanDB = async ({ authData, tableName }) => {
  try {
    const docClient = await getDocClient(authData);
    return new Promise((resolve, reject) => {
      docClient.scan({ TableName: tableName }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

// TODO: expand class for more than just equality condition expressions.
export class DBQueryItem {
  constructor({ id, key, value }) {
    this.id = id;
    this.key = key;
    this.value = value;
  }

  get keyConditionExpression() {
    return `${this.key} = ${this.id}`;
  }

  get expressionAttributeValue() {
    return {
      [this.id]: this.value,
    };
  }
}

const createQuery = ({ queryItems, tableName }) => {
  let expression = '';
  let attributes = {};
  forEach(queryItems, (item, index) => {
    expression += item.keyConditionExpression;
    if (queryItems.length > index + 1) {
      expression += ' and ';
    }
    attributes = {
      ...attributes,
      ...item.expressionAttributeValue,
    };
  });

  return {
    TableName: tableName,
    KeyConditionExpression: expression,
    ExpressionAttributeValues: attributes,
  };
};

export const queryDB = async ({ authData, queryItems, tableName }) => {
  try {
    const docClient = await getDocClient(authData);
    const query = createQuery({ queryItems, tableName });
    return new Promise((resolve, reject) => {
      docClient.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const putItem = async ({ authData, query }) => {
  try {
    const docClient = await getDocClient(authData);
    return new Promise((resolve, reject) => {
      docClient.put(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
