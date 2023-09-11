import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { trigger, query, stagger, transition, animateChild, animate, style, animation } from '@angular/animations';
import { UserService, ProxyApiData, PerspectiveConfig } from 'src/app/services/user.service';

export const DELAY_TIME = 500;

@Component({
  selector: 'app-orchestrate',
  templateUrl: './orchestrate.component.html',
  styleUrls: ['./orchestrate.component.scss'],
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(DELAY_TIME, animateChild())
        )
      ])
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ])
    ])
  ]
})
export class OrchestrateComponent implements OnInit {

  dynamicData = {
    preferredCollaborateFramework: '',
    preferredServiceMgmtTool: '',
    preferredCITool: '',
    preferredSecStandard: '',
    preferredSecurityTool: [],
    preferredDeploymentTool: '',
    preferredConfigTool: '',
    preferredOrchestrationTool: '',
    preferredTargetComputeEnvironment: '',
    preferredReleaseTool: '',
    preferredMonitoringTools: [],
    preferredLang: '',
    preferredLangVersion: '',
    preferredLangBuildTool: '',
    preferredProductBacklogTool: '',
    preferredSprintBacklogTool: '',
    preferredProjMgmtTool: '',
    preferredSourceCodeManager: '',
    preferredTestingTool: '',
    envData: [],

    //
    preferredProductBacklogToolGF: true,
    preferredSprintBacklogToolGF: true,
    preferredProjMgmtToolGF: true,
    preferredReleaseToolGF: true,
    preferredServiceMgmtToolGF: true,
    preferredCIToolGF: true,
    preferredTargetComputeEnvironmentGF: true,
    preferredOrchestrationToolGF: true,
    preferredConfigToolGF: true,
    preferredMonitoringTools0GF: true,
    preferredMonitoringTools1GF: true,
    preferredDeploymentToolGF: true,
    preferredSourceCodeManagerGF: true,
    preferredTestingToolGF: true,
    preferredSecurityTool0GF: true,
    preferredSecurityTool1GF: true,
    preferredSecurityTool2GF: true,
    preferredSecurityTool3GF: true,
  };

  devInstanceNo: number;
  devTshirtSize: string;
  testInstanceNo: number;
  testTShirtSize: string;
  stagingInstanceNo: number;
  stagingTShirtSize: string;
  prodInstanceNo: number;
  prodTShirtSize: string;

  org: any;
  emails = 'shaik.basha35@wipro.com,syed.ahemed@wipro.com';
  defaultData: any;

  firstShow = true;

  pipelineActivated: boolean = false;
  role: String;

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private service: UserService) {
    this.service.defaultConfig.subscribe(_defaultData => {
      this.defaultData = _defaultData;
    });
    this.role = this.service.role;
  }

  ngOnInit() {

    if (this.pipelineActivated) {
      //navigate to dashboard screen
      this.router.navigate(['dashboard'], { relativeTo: this.route.parent });
      return;
    }

    this.org = JSON.parse(localStorage.getItem('orgData')) || null;
    console.log(this.org, this.defaultData);


    this.devInstanceNo = this.org.devWorkbenchInfo.envConfig.devNoInstance;
    this.devTshirtSize = this.org.devWorkbenchInfo.envConfig.devTShirtSize;
    this.testInstanceNo = this.org.devWorkbenchInfo.envConfig.testNoInstance;
    this.testTShirtSize = this.org.devWorkbenchInfo.envConfig.testTShirtSize;
    this.stagingInstanceNo = this.org.devWorkbenchInfo.envConfig.stagNoInstance;
    this.stagingTShirtSize = this.org.devWorkbenchInfo.envConfig.stagTShirtSize;
    this.prodInstanceNo = this.org.devWorkbenchInfo.envConfig.prodNoInstance;
    this.prodTShirtSize = this.org.devWorkbenchInfo.envConfig.prodTShirtSize;

    let i = 0;

    if (this.org.devWorkbenchInfo.envType.includes('Development') && this.devInstanceNo > 0) {
      this.dynamicData.envData[i++] = 'Dev (' + this.devInstanceNo + ' Instances)';
      this.dynamicData.envData[i++] = this.devTshirtSize;
      this.dynamicData.envData[i++] = `Web: ${this.org.devWorkbenchInfo.bundle.web.name} (${this.org.devWorkbenchInfo.bundle.web.os})`;
      this.dynamicData.envData[i++] = `App: ${this.org.devWorkbenchInfo.bundle.app.name} (${this.org.devWorkbenchInfo.bundle.app.os})`;
      this.dynamicData.envData[i++] = `DB: ${this.org.devWorkbenchInfo.bundle.db.name} (${this.org.devWorkbenchInfo.bundle.web.db})`;
    }
    if (this.org.devWorkbenchInfo.envType.includes('Test') && this.testInstanceNo > 0) {
      this.dynamicData.envData[i++] = 'Test (' + this.testInstanceNo + ' Instances)';
      this.dynamicData.envData[i++] = this.testTShirtSize;
      this.dynamicData.envData[i++] = `Web: ${this.org.devWorkbenchInfo.bundle.web.name} (${this.org.devWorkbenchInfo.bundle.web.os})`;
      this.dynamicData.envData[i++] = `App: ${this.org.devWorkbenchInfo.bundle.app.name} (${this.org.devWorkbenchInfo.bundle.app.os})`;
      this.dynamicData.envData[i++] = `DB: ${this.org.devWorkbenchInfo.bundle.db.name} (${this.org.devWorkbenchInfo.bundle.db.os})`;
    }
    if (this.org.devWorkbenchInfo.envType.includes('Staging') && this.stagingInstanceNo > 0) {
      this.dynamicData.envData[i++] = 'Staging (' + this.stagingInstanceNo + ' Instances)';
      this.dynamicData.envData[i++] = this.stagingTShirtSize;
      this.dynamicData.envData[i++] = `Web: ${this.org.devWorkbenchInfo.bundle.web.name} (${this.org.devWorkbenchInfo.bundle.web.os})`;
      this.dynamicData.envData[i++] = `App: ${this.org.devWorkbenchInfo.bundle.app.name} (${this.org.devWorkbenchInfo.bundle.app.os})`;
      this.dynamicData.envData[i++] = `DB: ${this.org.devWorkbenchInfo.bundle.db.name} (${this.org.devWorkbenchInfo.bundle.db.os})`;
    }
    if (this.org.devWorkbenchInfo.envType.includes('Production') && this.prodInstanceNo > 0) {
      this.dynamicData.envData[i++] = 'Prod (' + this.prodInstanceNo + ' Instances)';
      this.dynamicData.envData[i++] = this.prodTShirtSize;
      this.dynamicData.envData[i++] = `Web: ${this.org.devWorkbenchInfo.bundle.web.name} (${this.org.devWorkbenchInfo.bundle.web.os})`;
      this.dynamicData.envData[i++] = `App: ${this.org.devWorkbenchInfo.bundle.app.name} (${this.org.devWorkbenchInfo.bundle.app.os})`;
      this.dynamicData.envData[i++] = `DB: ${this.org.devWorkbenchInfo.bundle.db.name} (${this.org.devWorkbenchInfo.bundle.db.os})`;
    }

    // dynamic data

    if (this.org.almInfo.catalogFramework && this.org.almInfo.catalogFramework !== 'Prescriptive') {
      this.dynamicData.preferredCollaborateFramework = this.org.almInfo.catalogFramework;
    } else {
      this.dynamicData.preferredCollaborateFramework = this.defaultData.collaborateConfig.catalog.framework[0];
    }

    if (this.org.secureInfo.standard && this.org.secureInfo.standard !== 'Prescriptive') {
      this.dynamicData.preferredSecStandard = this.org.secureInfo.standard;
    } else {
      this.dynamicData.preferredSecStandard = this.defaultData.secureConfig.catalog.standards[0];
    }

    if (this.org.devWorkbenchInfo.ciTool.value && this.org.devWorkbenchInfo.ciTool.value !== 'Prescriptive') {
      this.dynamicData.preferredCITool = this.org.devWorkbenchInfo.ciTool.value;
    } else {
      this.dynamicData.preferredCITool = this.defaultData.integrateConfig.catalog.ciTool[0];
    }

    //preferredSourceCodeManager
    if (this.org.devWorkbenchInfo.sourceCodeManager.value && this.org.devWorkbenchInfo.sourceCodeManager.value !== 'Prescriptive') {
      this.dynamicData.preferredSourceCodeManager = this.org.devWorkbenchInfo.sourceCodeManager.value;
    } else {
      this.dynamicData.preferredSourceCodeManager = this.defaultData.integrateConfig.sourceCodeManager[0];
    }

    //preferredSourceCodeManagerGF
    if (this.org.devWorkbenchInfo.sourceCodeManager.deployment && this.org.devWorkbenchInfo.sourceCodeManager.deployment === 'BrownField') {
      this.dynamicData.preferredSourceCodeManagerGF = false;
    }

    //preferredTestingTool
    if (this.org.devWorkbenchInfo.testingTool.value && this.org.devWorkbenchInfo.testingTool.value !== 'Prescriptive') {
      this.dynamicData.preferredTestingTool = this.org.devWorkbenchInfo.testingTool.value;
    } else {
      this.dynamicData.preferredTestingTool = this.defaultData.integrateConfig.testingTool[0];
    }

    //preferredTestingToolGF
    if (this.org.devWorkbenchInfo.testingTool.deployment && this.org.devWorkbenchInfo.testingTool.deployment === 'BrownField') {
      this.dynamicData.preferredTestingToolGF = false;
    }

    //preferredCIToolGF
    if (this.org.devWorkbenchInfo.ciTool.deployment &&
      this.org.devWorkbenchInfo.ciTool.deployment === 'BrownField') {
      this.dynamicData.preferredCIToolGF = false;
    }


    if (this.org.almInfo.serviceMgmtTool.value && this.org.almInfo.serviceMgmtTool.value !== 'Prescriptive') {
      this.dynamicData.preferredServiceMgmtTool = this.org.almInfo.serviceMgmtTool.value;
    } else {
      this.dynamicData.preferredServiceMgmtTool = this.defaultData.collaborateConfig.serviceMgmtTool[0];
    }


    //preferredServiceMgmtToolGF
    if (this.org.almInfo.serviceMgmtTool.deployment &&
      this.org.almInfo.serviceMgmtTool.deployment === 'BrownField') {
      this.dynamicData.preferredServiceMgmtToolGF = false;
    }


    // sec types
    if (this.org.secureInfo.sast.value && this.org.secureInfo.sast.value !== 'Prescriptive') {
      this.dynamicData.preferredSecurityTool[0] = this.org.secureInfo.sast.value;
    } else {
      this.dynamicData.preferredSecurityTool[0] = this.defaultData.secureConfig.catalog.sast[0];
    }
    if (this.org.secureInfo.dast.value && this.org.secureInfo.dast.value !== 'Prescriptive') {
      this.dynamicData.preferredSecurityTool[1] = this.org.secureInfo.dast.value;
    } else {
      this.dynamicData.preferredSecurityTool[1] = this.defaultData.secureConfig.catalog.dast[0];
    }
    if (this.org.secureInfo.raspv && this.org.secureInfo.rasp.value !== 'Prescriptive') {
      this.dynamicData.preferredSecurityTool[2] = this.org.secureInfo.rasp.value;
    } else {
      this.dynamicData.preferredSecurityTool[2] = this.defaultData.secureConfig.catalog.rasp[0];
    }
    if (this.org.secureInfo.siem.value && this.org.secureInfo.siem.value !== 'Prescriptive') {
      this.dynamicData.preferredSecurityTool[3] = this.org.secureInfo.siem.value;
    } else {
      this.dynamicData.preferredSecurityTool[3] = this.defaultData.secureConfig.catalog.siem[0];
    }

    if (this.org.secureInfo.sast.deployment && this.org.secureInfo.sast.deployment === 'BrownField') {
      this.dynamicData.preferredSecurityTool0GF = false;
    }
    if (this.org.secureInfo.dast.deployment && this.org.secureInfo.dast.deployment === 'BrownField') {
      this.dynamicData.preferredSecurityTool1GF = false;
    }
    if (this.org.secureInfo.rasp.deployment && this.org.secureInfo.rasp.deployment === 'BrownField') {
      this.dynamicData.preferredSecurityTool2GF = false;
    }
    if (this.org.secureInfo.siem.deployment && this.org.secureInfo.siem.deployment === 'BrownField') {
      this.dynamicData.preferredSecurityTool3GF = false;
    }



    if (this.org.deployInfo.orchestrationTool.value && this.org.deployInfo.orchestrationTool.value !== 'Prescriptive') {
      this.dynamicData.preferredOrchestrationTool = this.org.deployInfo.orchestrationTool.value;
    } else {
      this.dynamicData.preferredOrchestrationTool = this.defaultData.deployConfig.catalog.orchestrate[0];
    }

    //preferredOrchestrationToolGF
    if (this.org.deployInfo.orchestrationTool.deployment && this.org.deployInfo.orchestrationTool.deployment === 'BrownField') {
      this.dynamicData.preferredOrchestrationToolGF = false;
    }

    if (this.org.deployInfo.cloudType.value && this.org.deployInfo.cloudType.value !== 'Prescriptive') {
      this.dynamicData.preferredTargetComputeEnvironment = this.org.deployInfo.cloudType.value;
    } else {
      this.dynamicData.preferredTargetComputeEnvironment = this.defaultData.deployConfig.catalog.cloudType[0];
    }

    //preferredTargetComputeEnvironmentGF
    if (this.org.deployInfo.cloudType.deployment && this.org.deployInfo.cloudType.deployment === 'BrownField') {
      this.dynamicData.preferredTargetComputeEnvironmentGF = false;
    }

    if (this.org.deployInfo.configMgmtTool.value && this.org.deployInfo.configMgmtTool.value !== 'Prescriptive') {
      this.dynamicData.preferredConfigTool = this.org.deployInfo.configMgmtTool.value;
    } else {
      this.dynamicData.preferredConfigTool = this.defaultData.deployConfig.catalog.configTool[0];
    }

    //preferredConfigToolGF
    if (this.org.deployInfo.configMgmtTool.deployment && this.org.deployInfo.configMgmtTool.deployment === 'BrownField') {
      this.dynamicData.preferredConfigToolGF = false;
    }

    // if bundle is selected
    if (this.org.devWorkbenchInfo.bundle && this.org.devWorkbenchInfo.bundle.lang) {
      this.dynamicData.preferredLang = this.org.devWorkbenchInfo.bundle.lang.name;
      this.dynamicData.preferredLangBuildTool = this.org.devWorkbenchInfo.bundle.lang.buildTool;
    } else {
      // get from default values
      this.dynamicData.preferredLang = this.defaultData.integrateConfig.bundle[0].lang.name;
      this.dynamicData.preferredLangBuildTool = this.defaultData.integrateConfig.bundle[0].lang.buildTool;
    }

    if (this.org.deployInfo.deployTool.value && this.org.deployInfo.deployTool.value !== 'Prescriptive') {
      this.dynamicData.preferredDeploymentTool = this.org.deployInfo.deployTool.value;
    } else {
      this.dynamicData.preferredDeploymentTool = this.defaultData.deployConfig.catalog.deploy[0];
    }

    //preferredDeploymentToolGF
    if (this.org.deployInfo.deployTool.deployment && this.org.deployInfo.deployTool.deployment === 'BrownField') {
      this.dynamicData.preferredDeploymentToolGF = false;
    }


    if (this.org.almInfo.releaseMgmtTool.value &&
      this.org.almInfo.releaseMgmtTool.value !== 'Prescriptive') {
      this.dynamicData.preferredReleaseTool = this.org.almInfo.releaseMgmtTool.value;
    } else {
      this.dynamicData.preferredReleaseTool = this.defaultData.collaborateConfig.releaseMgmtTool[0];
    }

    //preferredReleaseToolGF
    if (this.org.almInfo.releaseMgmtTool.deployment &&
      this.org.almInfo.releaseMgmtTool.deployment === 'BrownField') {
      this.dynamicData.preferredReleaseToolGF = false;
    }


    if (this.org.almInfo.productBacklogTool.value &&
      this.org.almInfo.productBacklogTool.value !== 'Prescriptive') {
      this.dynamicData.preferredProductBacklogTool = this.org.almInfo.productBacklogTool.value;
    } else {
      this.dynamicData.preferredProductBacklogTool = this.defaultData.collaborateConfig.productBacklogTool[0];
    }

    //preferredProductBacklogToolGF
    if (this.org.almInfo.productBacklogTool.deployment &&
      this.org.almInfo.productBacklogTool.deployment === 'BrownField') {
      this.dynamicData.preferredProductBacklogToolGF = false;
    }


    if (this.org.almInfo.sprintBacklogTool.value && this.org.almInfo.sprintBacklogTool.value !== 'Prescriptive') {
      this.dynamicData.preferredSprintBacklogTool = this.org.almInfo.sprintBacklogTool.value;
    } else {
      this.dynamicData.preferredSprintBacklogTool = this.defaultData.collaborateConfig.sprintBacklogTool[0];
    }

    //preferredProductBacklogToolGF
    if (this.org.almInfo.sprintBacklogTool.deployment &&
      this.org.almInfo.sprintBacklogTool.deployment === 'BrownField') {
      this.dynamicData.preferredSprintBacklogToolGF = false;
    }

    if (this.org.almInfo.projectMgmtTool.value && this.org.almInfo.projectMgmtTool.value !== 'Prescriptive') {
      this.dynamicData.preferredProjMgmtTool = this.org.almInfo.projectMgmtTool.value;
    } else {
      this.dynamicData.preferredProjMgmtTool = this.defaultData.collaborateConfig.projectMgmtTool[0];
    }

    //preferredProjMgmtToolGF
    if (this.org.almInfo.projectMgmtTool.deployment &&
      this.org.almInfo.projectMgmtTool.deployment === 'BrownField') {
      this.dynamicData.preferredProjMgmtToolGF = false;
    }


    // map two monitors
    if (this.org.deployInfo.aimonitor.value && this.org.deployInfo.aimonitor.value !== 'Prescriptive') {
      this.dynamicData.preferredMonitoringTools[0] = this.org.deployInfo.aimonitor.value;
    } else {
      this.dynamicData.preferredMonitoringTools[0] = this.defaultData.deployConfig.catalog.aimonitor;
    }

    //preferredMonitoringTools0GF
    if (this.org.deployInfo.aimonitor.deployment && this.org.deployInfo.aimonitor.deployment === 'BrownField') {
      this.dynamicData.preferredMonitoringTools0GF = false;
    }

    if (this.org.deployInfo.cmonitor.value && this.org.deployInfo.cmonitor.value !== 'Prescriptive') {
      this.dynamicData.preferredMonitoringTools[1] = this.org.deployInfo.cmonitor.value;
    } else {
      this.dynamicData.preferredMonitoringTools[1] = this.defaultData.deployConfig.catalog.cmonitor;
    }

    //preferredMonitoringTools1GF
    if (this.org.deployInfo.cmonitor.deployment && this.org.deployInfo.cmonitor.deployment === 'BrownField') {
      this.dynamicData.preferredMonitoringTools1GF = false;
    }

  }

  sleep(delay) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + delay) { }
  }

  showError(errorMessage: string, action: string): void {
    this.snackBar.open(errorMessage, action, {
      duration: 2000,
    });
  }

  closeAnimation(event: any) {
    this.sleep(DELAY_TIME);
    // this.firstShow = false;
  }

  showInstances() {
    this.firstShow = false;
  }

  activatePipeline(): void {

    if (this.service.role === 'ADMIN') {
      // dont call the API yet
      this.showError('Toolchain successfully deployeed!', 'OK');
      setTimeout(()=> {
        this.service.logout();
        this.router.navigate(['']);
      },2000);
      return;
    }
    this.service.proxyApi().subscribe(
      () => {
        this.showError('Pipeline successfully activated!', 'OK')
        this.pipelineActivated = true;

        //navigate to dashboard screen
        this.router.navigate(['dashboard'], { relativeTo: this.route.parent });
      },
      (err) => {
        console.log('Error ', err);
        if (err.error.code && err.error.code === -1) {
          this.showError(`Unable to activate pipeline - ${err.error.message}.`, 'OK');
        } else {
          this.showError('Unable to activate pipeline. Please check server logs.', 'OK');
        }
      }
    );
  }

  getEnvClass(i: number, envData: string) {
    let styleClass = 'box env-' + i;
    let m = Math.trunc((i - 1) / 5);
    if (envData === '') {
      m = -1;
    }

    if (i % 5 === 1) {
      styleClass = styleClass + ' headingBox';
    } else if (i % 5 === 2) {
      styleClass = styleClass + ' tShirtBox';
    } else {
      switch (m) {
        case -1: styleClass = styleClass + ' emptyBox'; break;
        case 0: styleClass = styleClass + ' devBox'; break;
        case 1: styleClass = styleClass + ' testBox'; break;
        case 2: styleClass = styleClass + ' stagingBox'; break;
        case 3: styleClass = styleClass + ' prodBox'; break;
      }
    }
    return styleClass;
  }

  getTop(i: number) {
    const base = ((window.innerHeight * 0.80 - this.dynamicData.envData.length * 25) / 2) - 20;
    return base + i * 25 + 'px';
  }

}


