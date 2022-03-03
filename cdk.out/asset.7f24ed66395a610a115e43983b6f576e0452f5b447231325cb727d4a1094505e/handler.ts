import * as lambda from 'aws-cdk-lib/aws-lambda';

export async function handler(event: any, context: any) {
  return {
    body: 'Hello from a Lambda Function',
    statusCode: 200,
  };
}