import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ManualApprovalStep } from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from './pipeline-app-stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // This creates a new CodeCommit repository called 'WorkshopRepo'
    const repo = new codecommit.Repository(this, 'WorkshopRepo', {
      repositoryName: "WorkshopRepo"
    });

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'WorkshopPipeline',
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.codeCommit(repo, 'master'),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      }
      )
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "testingStage"));

    testingStage.addPost(new ManualApprovalStep('approval'));

   pipeline.addStage(new MyPipelineAppStage(this, "prodStage"));

  }
}
