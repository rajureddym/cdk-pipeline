import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope,id,props);

        const handler = new lambda.Function(this, 'lambdafun',{
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'handler.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambda'))
        })

    }
}