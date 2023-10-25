import { Component, OnInit } from '@angular/core';
import { DevWorkbenchInfo, Org, Stat } from 'src/app/models/model';
import { UserService } from 'src/app/services/user.service';
import { findIndex, countBy, groupBy } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pie1Label: String;
  pie2Label: String;

  buildLabels: String[] = [];
  buildData: number[] = [];
  deployLabels: String[] = [];
  deployData: number[] = [];
  buildTimeLabels: String[] = [];
  buildTimeData: number[] = [];

  branchLabels: String[] = [];
  branchSeries: number[][] = [[],[],[]];

  stats: Stat[] = [];


  _links = {
    azure: [
      'https://azuredevops.wiprodevlite.com/DefaultCollection/DevLite/_workitems/assignedtome/', // Agile
      'https://azuredevops.wiprodevlite.com/DefaultCollection/DevLite/_dashboards/dashboard/adfdc1b0-9a0f-4765-9ee0-ea59a8956b76', // DevTest
      'https://portal.azure.com/#blade/Microsoft_Azure_Security/SecurityMenuBlade/0', // Security
      'https://portal.azure.com/#@bldcad.onmicrosoft.com/dashboard/arm/subscriptions/5a825fe0-c29b-42cb-9d14-75b5e949a73e/resourcegroups/dashboards/providers/microsoft.portal/dashboards/8eaae5ef-a4a2-4e6c-aebc-f5e71146be8d', // Infra
      'https://portal.azure.com/#@bldcad.onmicrosoft.com/dashboard/arm/subscriptions/5a825fe0-c29b-42cb-9d14-75b5e949a73e/resourcegroups/dashboards/providers/microsoft.portal/dashboards/8eaae5ef-a4a2-4e6c-aebc-f5e71146be8d', // Apps
      'https://portal.azure.com/#@bldcad.onmicrosoft.com/dashboard/arm/subscriptions/5a825fe0-c29b-42cb-9d14-75b5e949a73e/resourcegroups/dashboards/providers/microsoft.portal/dashboards/8eaae5ef-a4a2-4e6c-aebc-f5e71146be8d', // Container
      'http://azuredevops.wiprodevlite.com/DefaultCollection/DevLite/_analytics'// Process
    ]
  }

  links: string[];
  loading: boolean = false;

  // labels
  labels = {
    'CurrentBuildsInQueue': 'Builds In Queue',
    'CurrentBuildsInProgress': 'Builds In Progress',
    'CanceledBuilds': 'Cancelled Builds',
    'SuccessfulBuilds': 'Successful Builds',
    'PartiallySuccessfulBuilds': 'Partially Successful Builds',
    'FailedBuilds': 'Failed Builds',
    'FailedDeployments': 'Failed Deployments',
    'SuccessfulDeployments': 'Successful Deployments',
    'PartiallySuccessfulDeployments': 'Partially Successful Deployments'
  }

  ciToolValue: String;

  constructor(private service: UserService, private snackBar: MatSnackBar) {
  }


  ngOnInit() {

    // get ciTool valie
    let org: Org = JSON.parse(localStorage.getItem('orgData')) || null;
    let data: DevWorkbenchInfo = org.devWorkbenchInfo;

    const { ciTool, buName, projectId, projectName } = data;

    this.ciToolValue = ciTool.value;

    // get the metrics
    this.loading = true;
    this.service.getMetrics().subscribe(
      (response: any) => {

        if (ciTool.value === 'Azure') {

          this.pie1Label = 'Build Summary';
          this.pie2Label = 'Deployment Summary';

          // build metrics
          response.metrics.buildMetrics.map(metric => {
            //console.log(metric);
            const index = findIndex(this.stats, { type: 'build', title: this.labels[metric.name] });
            if (index > -1) {
              this.stats[index].value = this.stats[index].value + metric.intValue;
            } else {
              this.stats.push({ type: 'build', title: this.labels[metric.name], value: metric.intValue })
            }
          });

          // deploy metrics
          response.metrics.deployMetrics.map(metric => {
            //console.log(metric);
            const index = findIndex(this.stats, { type: 'deployment', title: this.labels[metric.name] });
            if (index > -1) {
              this.stats[index].value = this.stats[index].value + metric.value;
            } else {
              this.stats.push({ type: 'deployment', title: this.labels[metric.name], value: metric.value })
            }
          });

          // repo metrics
          const repoMetrics = response.metrics.repoMetrics;
          if (repoMetrics.pullRequestsCompletedCount && repoMetrics.pullRequestsCreatedCount && repoMetrics.commitsPushedCount) {
            this.stats.push({ type: 'repo', title: 'Open Pull Requests', value: repoMetrics.pullRequestsCompletedCount - repoMetrics.pullRequestsCreatedCount });
            this.stats.push({ type: 'repo', title: 'Commit Pushed Count', value: repoMetrics.commitsPushedCount });
          }


          // build time
          this.buildTimeLabels = response.metrics.buildTimeMetrics.map(_time => _time.buildNumber);
          this.buildTimeData = response.metrics.buildTimeMetrics.filter(_time => _time.timeTaken > 1).map(_time => {
            return _time.timeTaken;
          });

          // calculate build and deploy metrics charts data
          this.buildLabels = this.stats.filter(stat => stat.type === 'build').map(stat => stat.title);
          this.buildData = this.stats.filter(stat => stat.type === 'build').map(stat => stat.value);
          this.deployLabels = this.stats.filter(stat => stat.type === 'deployment').map(stat => stat.title);
          this.deployData = this.stats.filter(stat => stat.type === 'deployment').map(stat => stat.value);
        }
        else if (ciTool.value === 'GitLab') {

          this.pie1Label = 'Pipeline Summary';
          this.pie2Label = 'Branch Summary';

          console.log(response.metrics);
          const statusCounts = countBy(response.metrics.pipelines, 'status');
          const branchCounts = countBy(response.metrics.pipelines, 'ref');
          const minBuildTime = Math.round(response.metrics.minBuildTime) || 0;
          const maxBuildTime = Math.round(response.metrics.maxBuildTime) || 0;
          const avgBuildTime = Math.round(response.metrics.avgBuildTime) || 0;

          this.stats.push({ type: 'build', title: 'Total Pipelines', value: response.metrics.totalPipelines })
          this.stats.push({ type: 'build', title: 'Successful Builds', value: statusCounts.success || 0 })
          this.stats.push({ type: 'build', title: 'Cancelled Builds', value: statusCounts.canceled || 0 })
          this.stats.push({ type: 'build', title: 'Failed Builds', value: statusCounts.failed || 0 })

          this.stats.push({ type: 'deployment', title: 'Minimum Build Time', value: minBuildTime, suffix: 's' })
          this.stats.push({ type: 'deployment', title: 'Maximum Build Time', value: maxBuildTime, suffix: 's' })
          this.stats.push({ type: 'deployment', title: 'Average Build Time', value: avgBuildTime, suffix: 's' })

          Object.keys(branchCounts).forEach(key => {
            this.stats.push({ type: 'repo', title: `Pipelines - ${key}`, value: branchCounts[key] || 0 })
          });

          // calculate build and deploy metrics charts data
          this.buildLabels = this.stats.filter(stat => stat.type === 'build').map(stat => stat.title);
          this.buildData = this.stats.filter(stat => stat.type === 'build').map(stat => stat.value);
          this.deployLabels = this.stats.filter(stat => stat.type === 'repo').map(stat => stat.title);
          this.deployData = this.stats.filter(stat => stat.type === 'repo').map(stat => stat.value);

          const branchSeriesGroup = groupBy(response.metrics.pipelines, 'ref');

          Object.keys(branchSeriesGroup).forEach(key => {
            this.branchLabels.push(key);
            var min = -1, max = -1, avg = 0, total = 0, count = 0;
            branchSeriesGroup[key].forEach(pipeline => {
              total = total + pipeline.buildTime;
              if(min === -1){
                min = pipeline.buildTime;
                max = pipeline.buildTime;
              }

              if(pipeline.buildTime < min){
                min = pipeline.buildTime;
              }
              if(pipeline.buildTime > max){
                max = pipeline.buildTime;
              }
              count ++;
            });
            console.log(total, count);
            avg = Math.round(total/count);
            console.log(min, max, avg);
            this.branchSeries[0].push(min);
            this.branchSeries[1].push(max);
            this.branchSeries[2].push(avg);
          });
        }
        this.loading = false;



        //console.log(this.stats);
      },
      (err) => {
        console.log('Error ', err);
        this.loading = false;
        this.showError('Unable to get metrics - ' + err.error.message, 'RETRY');
      }
    );

    switch (ciTool.value) {
      case 'Azure':
        this.links = this._links.azure;
        break;
      case 'GitLab':
        const bu = (buName && buName !== "") ? buName : 'root';
        const pName = projectName.trim();
        this.links = [
          `https://52.7.33.92/${bu}/${pName}/-/analytics/issues_analytics`,
          `https://52.7.33.92/${bu}/${pName}/pipelines/charts`,
          `https://52.7.33.92/${bu}/${pName}/-/security/dashboard/?project_id=${projectId}&scope=dismissed&page=1&days=90`,
          `https://52.7.33.92/${bu}/${pName}/-/environments/${projectId}/metrics`,
          `https://52.7.33.92/${bu}/${pName}/-/environments/${projectId}/metrics`,
          `https://52.7.33.92/${bu}/${pName}/-/environments/${projectId}/metrics`,
          `https://52.7.33.92/${bu}/${pName}/-/value_stream_analytics`,
        ]
        break;
      default:
        this.links = ['', '', '', '', '', '', ''];
        break;
    }
  }

  showError(errorMessage: string, action: string): void {
    this.snackBar.open(errorMessage, action, {
      duration: 2000,
    });
  }

}
