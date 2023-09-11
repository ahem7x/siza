import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { User } from '../models/model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _initialDefaultConfig: PerspectiveConfig = JSON.parse(localStorage.getItem("defaultPrescriptive"));
  private _defaultConfig = new BehaviorSubject<PerspectiveConfig>(this._initialDefaultConfig);
  private loginStatus = JSON.parse(localStorage.getItem("loginStatus") || "false");
  private userRole = localStorage.getItem("userRole") || null;
  private token = localStorage.getItem("token") || null;
  private userName = localStorage.getItem("username") || null;
  private orgId = localStorage.getItem("orgId") || null;
  private sourceRoute = localStorage.getItem("sourceRoute") || null;
  private _orgUsers: [User] = JSON.parse(localStorage.getItem("orgUsers")) || null;

  get orgUsers() {
    return this._orgUsers;
  }

  set orgUsers(users: [User]) {
    this._orgUsers = users;
    localStorage.setItem("orgUsers", JSON.stringify(users));
  }

  set defaultConfiguration(_value: PerspectiveConfig) {
    this._defaultConfig.next(_value);
  }

  get defaultConfig() {
    return this._defaultConfig.asObservable();
  }

  login(username: string, password: string, source: string) {
    this.sourceRoute = source || "1";
    localStorage.setItem("sourceRoute", this.sourceRoute);
    return this.http.post(
      "/api/v3/org/user/login",
      {
        username,
        password
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "my-auth-token"
        })
      }
    );
  }

  logout(): void {
    this.loginStatus = false;
    this.userRole = null;
    this.token = null;
    this.sourceRoute = null;
    this._orgUsers = null;
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userdata");
    localStorage.removeItem("uiconfig");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("sourceRoute");
    localStorage.removeItem("orgData");
    localStorage.removeItem("orgUsers");
  }

  createUserDetails(data: any) {

    this.loginStatus = true;
    this.token = data.token;
    this.userName = data.username;
    this.userRole = data.role;
    this.orgId = data.orgId;

    localStorage.setItem("loginStatus", "true");
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem("orgId", data.orgId);
    localStorage.setItem("uiconfig", JSON.stringify(data.configuration));
    localStorage.setItem("defaultPrescriptive", JSON.stringify(data.defaultPrescriptive));
    localStorage.setItem("orgData", JSON.stringify(data.org));
    localStorage.setItem("orgUsers", JSON.stringify(data.users));

    this._orgUsers = data.users;
    this.defaultConfiguration = data.defaultPrescriptive;
  }

  get isLoggedIn() {
    return this.loginStatus;
  }

  get role() {
    return this.userRole;
  }

  get source() {
    return this.sourceRoute;
  }

  get username() {
    return this.userName;
  }

  get apiToken() {
    return this.token;
  }

  proxyApi() {
    return this.http.post(
      "/api/v3/proxy",
      {},
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  getMetrics(){
    return this.http.get(
      "/api/v3/proxy/metrics",
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  getRepos(){
    return this.http.get(
      "/api/v3/proxy/repos",
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  getOrgDetails() {
    return this.http.get(`/api/v3/org/${this.orgId}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.apiToken
      })
    });
  }


  updateOrgDetails(data) {
    return this.http.put(
      `/api/v3/org/${this.orgId}`,
      data,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  createOrgUser(username: String, password: String) {
    return this.http.post(
      `/api/v3/org/${this.orgId}/user`,
      {
        username,
        password
      },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  deleteOrgUser(userId: String) {
    return this.http.delete(
      `/api/v3/org/${this.orgId}/user/${userId}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: this.apiToken
        })
      }
    );
  }

  constructor(private http: HttpClient) { }
}

export interface UserProfile {
  busnessUnit: string;
  product: string;
  release: string;
  releaseVersion: string;
  fieldType: string;
}

export interface ToolInfo {
  value: string;
  url: string;
}

export interface CollaborateInfo {
  productBacklogTool: ToolInfo;
  sprintBacklogTool: ToolInfo;
  projectMgmtTool: ToolInfo;
  releaseMgmtTool: ToolInfo;
  serviceMgmtTool: ToolInfo;
  catalogFramework: string;
}

export interface EnvConfig {
  devNoInstance: number;
  devTShirtSize: string;
  testNoInstance: number;
  testTShirtSize: string;
  stagNoInstance: number;
  stagTShirtSize: string;
  prodNoInstance: number;
  prodTShirtSize: string;
}

export interface IntegrateInfo {
  gitCodeUrl: string;
  testingTool: string;
  sourceCodeManager: string;
  branch: string;
  gitTestUrl: string;
  microServicesEnabled: boolean; // new
  loadBalancer: string; // new
  apiGateway: string; // new
  serviceDiscovery: string; // new
  containerOrchestrator: string; // new
  ciTool: string;
  ciServerIp: string;
  serverType: string;
  envType: string[];
  envConfig: EnvConfig;
}

export interface SecureInfoCatalog {
  standard: string;
  sast: string;
  dast: string;
  rasp: string;
  siem: string;
}

export interface SecureInfo {
  siemIp: string;
  sastIp: string;
  dastIp: string;
  raspIp: string;
  catalog: SecureInfoCatalog;
}

export interface DeployInfoCatalog {
  deploy: string;
  aimonitor: string;
  cmonitor: string;
}

export interface DeployInfo {
  configMgmtTool: string;
  cloudType: string;
  orchestrationTool: string;
  catalog: DeployInfoCatalog;
}

export interface PerspectiveConfig {
  collaborateConfig?: {
    catalog?: {
      framework: [string];
    };
    productBacklogTool: [string];
    projectMgmtTool: [string];
    releaseMgmtTool: [string];
    serviceMgmtTool: [string];
    sprintBacklogTool: [string];
  };
  deployConfig?: {
    catalog: {
      configTool: [string];
      cloudType: [string];
      orchestrate: [string];
      deploy: [string];
      aimonitor: [string];
      cmonitor: [string];
    };
  };
  secureConfig?: {
    catalog?: {
      standards: [string];
      sast: [string];
      dast: [string];
      rasp: [string];
      siem: [string];
    };
  };
  integrateConfig?: {
    sourceCodeManager: [string];
    testingTool: [string];
    catalog: {
      ciTool: [string];
      os: [string];
      webServer: [string];
      appServer: [string];
      lang: [string];
      //buildTool: [string],
      db: [string];
      loadBalancer: [string];
      apiGateway: [string];
      serviceDirectory: [string];
      containerOrchestrator: [string];
    },
    bundle: [
      {
        lang: { name: String, buildTool: String },
        web: { os: String, name: "Nginx" },
        app: { os: String, name: String },
        db: { os: String, name: String }
      }
    ]
  };
}

export interface UiConfigurations {
  configId: string;
  collaborateConfig: {
    productBacklogTool: string[];
    sprintBacklogTool: string[];
    projectMgmtTool: string[];
    releaseMgmtTool: string[];
    serviceMgmtTool: string[];
    catalog: {
      framework: string[];
    };
  };
  integrateConfig: {
    sourceCodeManager: string[];
    testingTool: string[];
    catalog: {
      serverType: [];
      lang: [];
      buildTool: [];
      webServer: [];
      appServer: [];
      db: [];
      os: [];
      loadBalancer: [];
      apiGateway: [];
      serviceDirectory: [];
      containerOrchestrator: [];
      ciTool: [];
      tShirtSize: [];
      envType: [];
    };
  };
  secureConfig: {
    catalog: {
      standards: [];
      sast: [];
      dast: [];
      rasp: [];
      siem: [];
    };
    sastIp: string;
    dastIp: string;
    raspIp: string;
    siemIp: string;
  };
  deployConfig: {
    catalog: {
      configTool: [];
      cloudType: [];
      deploy: [];
      orchestrate: [];
      aimonitor: [];
      cmonitor: [];
    };
  };
}

export interface ProxyApiData {
  instance_name: string;
  Gitcodeurl: string;
  GitBranch: string;
  Language: string;
  Languageversion: string;
  FieldType: string;
  ServerType: string;
  DevInstances: number;
  DTshirtsize: string;
  TestInstances: number;
  TTshirtsize: string;
  StagingInstances: number;
  STshirtsize: string;
  ProdInstances: number;
  PTshirtsize: string;
  MAILIDs: string;
}