export class DynamicFlowData {
    // dev
    preferredBuildTool: string = 'Maven';
    preferredBugTrackingTool: string; //not displayed
    // sec
    preferredDeploymentTool: string = 'Terraform';
    preferredTargetComputeEnvironment : string = 'Amazon';
    preferredCICDTool: string; // not displayed
    preferredOrchestrationTool: string = 'Kubernetes';
    preferredSecurityTool: string = 'Fortify';
}