interface BundleItem {
    os: String;
    name: String;
    buildTool?: String;
}

export interface Bundle {
    _id: String;
    lang: BundleItem;
    web: BundleItem;
    app: BundleItem;
    db: BundleItem;
}

export interface Tool {
    value: String;
    deployment: String;
    url: String,
    license: String;
    certificate: String;
    username: String;
    password: String;
};

export interface Release {
    name: String,
    version: String
};

export interface Product {
    name: String;
    releases?: [Release];
};

export interface BusinessUnit {
    _id?: String;
    name: String;
    products?: [Product];
}
export interface EnvConfig {
    devNoInstance: Number;
    devTShirtSize: String;
    testNoInstance: Number;
    testTShirtSize: String;
    stagNoInstance: Number;
    stagTShirtSize: String;
    prodNoInstance: Number;
    prodTShirtSize: String;
}

export interface DevWorkbenchInfo {
    sourceCodeManager: Tool,
    testingTool: Tool,
    ciTool: Tool,
    gitCodeUrl: String,
    branch: String,
    gitTestUrl: String,
    microServicesEnabled: Boolean,
    loadBalancer: String,
    apiGateway: String,
    serviceDiscovery: String,
    containerOrchestrator: String,
    contanersEnabled: Boolean,
    dockerFile: String,
    envType: [String],
    envConfig: EnvConfig,
    bundle: Bundle,
    enableHA: Boolean,
    // new fields
    repository: string;
    projectId: string;
    projectName: string;
    buName: string;
    buId: string;
}

export interface Org {
    orgName: { type: String, unique: true },
    businessUnits: [BusinessUnit],
    almInfo: {
        productBacklogTool: Tool,
        sprintBacklogTool: Tool,
        projectMgmtTool: Tool,
        releaseMgmtTool: Tool,
        serviceMgmtTool: Tool,
        catalogFramework: String
    },
    devWorkbenchInfo: DevWorkbenchInfo,
    secureInfo: {
        siem: Tool,
        sast: Tool,
        dast: Tool,
        rasp: Tool,
        standard: String
    },
    deployInfo: {
        configMgmtTool: Tool,
        cloudType: Tool,
        orchestrationTool: Tool,
        deployTool: Tool,
        aimonitor: Tool,
        cmonitor: Tool
    }
}

export interface User {
    _id?: String;
    username: String;
}

export interface Stat {
    type: String,
    title: String,
    value: number,
    suffix?: String;
}