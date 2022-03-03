import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack } from './lambda-stack';

export class MyPipelineAppStage extends cdk.Stage{
    constructor(scope: Construct, id: string, props?: cdk.StageProps){
        super(scope,id,props);
        const lambdastack = new MyLambdaStack(this,'LambdaStack');
    }
}