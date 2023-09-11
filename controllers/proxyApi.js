var router = require("express").Router();
var org = require("../model/org");
var encHelper = require("../helpers/encryption-helper");
const axios = require("axios").default;

// get dashboard metrics
router.get("/metrics", function(req, resp) {
  const { userId } = req.query;
  org.getFullUserById(userId, function(user, err) {
    
    const { username, password, orgId } = user;
    const decryptedPassword = encHelper.decrypt(password);

    org.getOrgById(orgId, async function(response, error) {
      const { org } = response;
      const { ciTool, buId, buName, projectId, projectName } = org.devWorkbenchInfo;
      const url = ciTool.url.replace("http://", "").replace("https://", "");

      console.log(ciTool.value, url, buId, buName, projectName);

      try {
        switch (ciTool.value) {
          case "Azure":
            console.log("getting build metrics");
            const buildResponse = await axios.get(
              `http://${url}/${buName}/${projectName}/_apis/build/Metrics/Daily?minMetricsTime=2020-03-09T11%3A15%3A00.041Z`,
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                }
              }
            );

            const buildMetrics = buildResponse.data.value.filter(
              metric =>
                metric.name === "CurrentBuildsInQueue" ||
                metric.name === "CurrentBuildsInProgress" ||
                metric.name === "CanceledBuilds" ||
                metric.name === "SuccessfulBuilds" ||
                metric.name === "PartiallySuccessfulBuilds" ||
                metric.name === "FailedBuilds"
            );

            console.log("getting deploy metrics");
            const deployResponse = await axios.post(
              `http://${url}/${buName}/_apis/Contribution/HierarchyQuery/project/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1`,
              {
                contributionIds: ["ms.vss-releaseManagement-web.metrics-data-provider"],
                dataProviderContext: {
                  properties: {
                    minmetricstime: "2020-03-09T00:00:00.000Z",
                    operation: "getdeploymentmetrics",
                    sourcePage: {
                      url: `http://${url}/${buName}/${projectName}`,
                      routeId: "ms.vss-tfs-web.project-overview-route",
                      routeValues: {
                        project: projectName,
                        controller: "Apps",
                        action: "ContributedHub",
                        serviceHost: `${buId} (${buName})`
                      }
                    }
                  }
                }
              },
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                },
                headers: {
                  Accept:
                    "application/json;api-version=5.0-preview.1;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true",
                  "Content-Type": "application/json"
                }
              }
            );

            const deployMetrics = deployResponse.data.dataProviders[
              "ms.vss-releaseManagement-web.metrics-data-provider"
            ].deploymentMetrics.filter(
              metric =>
                metric.name === "FailedDeployments" ||
                metric.name === "SuccessfulDeployments" ||
                metric.name === "PartiallySuccessfulDeployments"
            );

            // repo metrics
            console.log("getting repo metrics");
            const repoResponse = await axios.post(
              `http://${url}/${buName}/_apis/Contribution/HierarchyQuery/project/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1`,
              {
                contributionIds: ["ms.vss-code-web.code-metrics-data-provider-verticals"],
                dataProviderContext: {
                  properties: {
                    numOfDays: 7,
                    sourcePage: {
                      url: `http://${url}/${buName}/${projectName}`,
                      routeId: "ms.vss-tfs-web.project-overview-route",
                      routeValues: {
                        project: projectName,
                        controller: "Apps",
                        action: "ContributedHub",
                        serviceHost: `${buId} (${buName})`
                      }
                    }
                  }
                }
              },
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                },
                headers: {
                  Accept:
                    "application/json;api-version=5.0-preview.1;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true",
                  "Content-Type": "application/json"
                }
              }
            );

            const repoMetrics =
              repoResponse.data.dataProviders[
                "ms.vss-code-web.code-metrics-data-provider-verticals"
              ].gitmetrics;

            // get build time
            console.log("getting buildtime metrics");
            const buildTimeResponse = await axios.get(
              `http://${url}/${buName}/${projectName}/_apis/build/builds?definitions=15&statusFilter=2&top=10&queryOrder=3c`,
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                }
              }
            );

            const buildTimeMetrics = buildTimeResponse.data.value.map(value => {
              return {
                buildNumber: value.buildNumber,
                startTime: value.startTime,
                //finishTime: value.finishTime,
                timeTaken: (new Date(value.finishTime) - new Date(value.startTime)) / 1000
              };
            });

            resp.status(200).send({
              code: 0,
              metrics: {
                buildMetrics,
                deployMetrics,
                repoMetrics,
                buildTimeMetrics
              }
            });

            break;
          case 'GitLab':
            console.log('getting metrics for GitLab..')
            const pipelineResponse = await axios
            .get(
              `https://${url}/api/v4/projects/${projectId}/pipelines`,
              {
                headers: {
                  "PRIVATE-TOKEN": decryptedPassword
                }
              }
            );

            var pipelines = [];
            var minBuildTime = -1;
            var maxBuildTime = -1;
            var total = 0;
            for(let pipeline of pipelineResponse.data){
              const buildTime = Math.round((new Date(pipeline.updated_at) - new Date(pipeline.created_at)) / 1000);

              if(buildTime < 5)
                continue;

              total = total + buildTime;

              if(minBuildTime === -1){
                minBuildTime = buildTime;
                maxBuildTime = buildTime;
              } 
              
              if(buildTime < minBuildTime){
                minBuildTime = buildTime;
              }

              if(buildTime > maxBuildTime){
                maxBuildTime = buildTime;
              }

              pipelines.push({
                id: pipeline.id,
                ref: pipeline.ref,
                status: pipeline.status,
                buildTime,
              })
            }
            resp.status(200).send({
              code: 0,
              metrics: {
                totalPipelines: pipelines.length,
                pipelines,
                minBuildTime,
                maxBuildTime,
                avgBuildTime: total/pipelines.length
              }
            });
            break;
          default:
            resp.status(200).send({
              code: 0,
              metrics: {
                buildMetrics: [],
                deployMetrics: [],
                repoMetrics: {},
                buildTimeMetrics: []
              }
            });
            break;
        }
      } catch (err) {
        console.log(err);
        resp.status(500).send({
          code: -1
        });
      }
    });
  });
});

// get repos
router.get("/repos", function(req, resp) {
  const { userId } = req.query;

  // get orgId from user
  org.getFullUserById(userId, function(user, err) {
    const { username, password, orgId } = user;
    const decryptedPassword = encHelper.decrypt(password);
    org.getOrgById(orgId, async function(response, error) {
      var repos = [];
      const { org } = response;
      const { ciTool } = org.devWorkbenchInfo;

      try {
        if (ciTool && ciTool.value === "Azure") {
          const url = ciTool.url.replace("http://", "").replace("https://", "");
          // get bus

          console.log("getting BUs");

          const bus = await axios.get(`http://${url}/_apis/projectCollections?`, {
            auth: {
              username: username,
              password: decryptedPassword
            }
          });

          for (let _bu of bus.data.value) {
            // get projects
            console.log("getting projects");
            const projects = await axios.post(
              `http://${url}/${_bu.name}/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1`,
              {
                contributionIds: ["ms.vss-tfs-web.project-plus-product-data-provider"],
                dataProviderContext: {
                  properties: {
                    sourcePage: {
                      url: `http://${url}/${_bu.name}`,
                      routeId: "ms.vss-tfs-web.suite-me-page-route",
                      routeValues: {
                        view: "projects",
                        controller: "ContributedPage",
                        action: "Execute",
                        serviceHost: `${_bu.id} (DefaultCollection)`
                      }
                    }
                  }
                }
              },
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                }
              }
            );

            for (let _project of projects.data.dataProviders[
              "ms.vss-tfs-web.project-plus-product-data-provider"
            ].projects) {
              // get repositories
              console.log("getting repos");
              const _repos = await axios.get(
                `http://${url}/${_bu.name}/${_project.projectId}/_apis/git/repositories?api-version=4.1`,
                {
                  auth: {
                    username: username,
                    password: decryptedPassword
                  }
                }
              );

              for (let _repo of _repos.data.value) {
                console.log("getting branches");
                const branches = await axios.get(
                  `http://${url}/${_bu.name}/${_project.projectId}/_apis/git/repositories/${_repo.id}/refs?filter=heads`,
                  {
                    auth: {
                      username: username,
                      password: decryptedPassword
                    }
                  }
                );
                for (let _branch of branches.data.value) {
                  repos.push({
                    buId: _bu.id,
                    bu: _bu.name,
                    projectId: _project.projectId,
                    projectName: _project.projectName,
                    repository: _repo.name,
                    repositoryUrl: _repo.remoteUrl,
                    branch: _branch.name
                  });
                }
              }
            }
          }
        } else if (ciTool && ciTool.value === "GitLab") {
          // Gitlab
          const url = ciTool.url.replace("http://", "").replace("https://", "");
          // get bus

          console.log(username, decryptedPassword);

          console.log("getting projects");
          const projects = await axios.get(`https://${url}/api/v4/users/root/projects`, {
            headers: {
              "PRIVATE-TOKEN": decryptedPassword
            }
          });

          for (let _project of projects.data) {

            
            console.log('getting branches for ', url, _project.id);
            const branches = await axios.get(`https://${url}/api/v4/projects/${_project.id}/repository/branches`, {
              headers: {
                "PRIVATE-TOKEN": decryptedPassword
              }
            });

            for(let _branch of branches.data){
              if (_project.shared_with_groups.length === 0) {
                repos.push({
                  buId: 0,
                  bu: "",
                  projectId: _project.id,
                  projectName: _project.name,
                  repository: _project.name,
                  repositoryUrl: _project.http_url_to_repo,
                  branch: _branch.name
                });
              }else {
                for (let _group of _project.shared_with_groups) {
                  repos.push({
                    buId: _group.group_id,
                    bu: _group.group_name,
                    projectId: _project.id,
                    projectName: _project.name,
                    repository: _project.name,
                    repositoryUrl: _project.http_url_to_repo,
                    branch: _branch.name
                  });
                }
              }
            }
          }
        }
      } catch (error) {
        console.log("Error in getting repos", error.message);
        resp.status(500).send({
          code: -1,
          message: error.message
        });
      }
      console.log('ALL DONE');
      resp.status(200).send({
        code: 0,
        repos
      });
    });
  });
});

// activate pipeline
router.post("/", function(req, resp) {
  const { userId } = req.query;

  // get orgId from user
  org.getFullUserById(userId, function(user, err) {
    const { username, password, orgId } = user;
    const decryptedPassword = encHelper.decrypt(password);
    
    org.getOrgById(orgId, function(response, error) {
      const { org } = response;
      const { ciTool, buName, projectId, projectName, branch } = org.devWorkbenchInfo;
      // only these two parameters mandatory
      if (!ciTool || !ciTool.url) {
        resp.status(400).send({
          code: -1,
          message: "Mandatory CI Tool parameters are not set or are missing."
        });
        return;
      }

      var url = ciTool.url.replace("http://", "").replace("https://", "");
      switch (ciTool.value) {
        case "Azure":
          console.log('activating pipeline for Azure..')
          const defId = 15;
          axios
            .post(
              `http://${url}/${buName}/${projectName}/_apis/build/builds?api-version=5.0`,
              { definition: { id: defId } },
              {
                auth: {
                  username: username,
                  password: decryptedPassword
                }
              }
            )
            .then(res => {
              console.log("SUCCESS while calling activate pipeline", res.data);
              resp.status(201).send({
                code: 0,
                message: "SUCCESS"
              });
            })
            .catch(err => {
              console.log("FAILURE while calling activate pipeline ", err);
              resp.status(500).send({
                code: -1,
                message: err.message
              });
            });
          break;
        case 'GitLab':
            console.log('activating pipeline for GitLab.. - ',branch);
            let formData = {ref: branch};
            const encodeForm = (data) => {
              return Object.keys(data)
                  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                  .join('&');
            }
            axios
            .post(
              `https://${url}/api/v4/projects/${projectId}/pipeline`,
              encodeForm(formData),
              {
                headers: {
                  "PRIVATE-TOKEN": decryptedPassword
                }
              }
            )
            .then(res => {
              console.log("SUCCESS while calling activate pipeline", res.data);
              resp.status(201).send({
                code: 0,
                message: "SUCCESS"
              });
            })
            .catch(err => {
              console.log(err);
              console.log("FAILURE while calling activate pipeline ", err.response.data);
              resp.status(500).send({
                code: -1,
                message: err.message
              });
            });
        default:
          break;
      }
    });
  });
});

module.exports = router;
