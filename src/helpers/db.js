import { DynamoDB } from 'aws-sdk';
import {forEach } from 'lodash';

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

export const scanDB = (authData, tableName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docClient = await getDocClient(authData);
      docClient.scan({ TableName: tableName }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
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
    }
  }
}

const createQuery = ({ queryItems, tableName }) => {
  let expression = '';
  let attributes = {};

}

export const queryDB = ({ authData, tableName, queryItems }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docClient = await getDocClient(authData);
      // const query = {
      //   TableName: tableName,
      //   KeyConditionExpression: 'id = :i',
      //   ExpressionAttributeValues: {
      //     ':i': 'test',
      //   },
      // };

      // docClient.query(query, (err, data) => {
      //   console.log(err);
      //   console.log(data);
      // });
    }
    catch(e) {
      reject(e);
    }
  });
}
