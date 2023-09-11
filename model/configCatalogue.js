var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Configuration Items and Catalog
var configitemsSchema = new Schema({
  configId: String,
  collaborateConfig: {
    productBacklogTool: [String],
    sprintBacklogTool: [String],
    projectMgmtTool: [String],
    releaseMgmtTool: [String],
    serviceMgmtTool: [String],
    catalog: {
      framework: []
    }
  },
  integrateConfig: {
    sourceCodeManager: [],
    testingTool: [],
    catalog: {
      serverType: [],
      buildTool: [],
      loadBalancer: [],
      apiGateway: [],
      serviceDirectory: [],
      containerOrchestrator: [],
      ciTool: [],
      tShirtSize: [],
      envType: []
    },
    bundle: [
      {
        lang: { name: String, buildTool: String },
        web: { os: String, name: String },
        app: { os: String, name: String },
        db: { os: String, name: String }
      }
    ]
  },
  secureConfig: {
    catalog: {
      standards: [],
      sast: [],
      dast: [],
      rasp: [],
      siem: []
    }
  },
  deployConfig: {
    catalog: {
      configTool: [],
      cloudType: [],
      deploy: [],
      orchestrate: [],
      aimonitor: [],
      cmonitor: []
    }
  }
});

var ConfigItemModel = mongoose.model("configurationitems", configitemsSchema);

// generate bundles
const langs = [
  { name: "Java", buildTool: "Maven" },
  { name: "C", buildTool: "Conan" },
  { name: "C++", buildTool: "Conan" },
  { name: ".Net", buildTool: "MS Build" }
];
const webs = [
  { os: "Linux", name: "Nginx" },
  { os: "Windows", name: "IIS" }
];
const apps = [
  { os: "Linux", name: "Apache Tomcat" },
  { os: "Windows", name: "Wildfly" },
  { os: "Windows", name: "IIS" }
];
const dbs = [
  { os: "Windows", name: "MSSQL" },
  { os: "Windows", name: "Oracle" },
  { os: "Linux", name: "Oracle" },
  { os: "Linux", name: "MySQL" },
  { os: "Windows", name: "PostgreSQL" }
];

var bundles = [];

webs.forEach(web => {
  dbs.forEach(db => {
    apps.forEach(app => {
      langs.forEach(lang => {
        bundles.push({ lang, web, app, db });
      });
    });
  });
});

ConfigItemModel.updateOne(
  { configId: "1" },
  {
    collaborateConfig: {
      productBacklogTool: [
        "Prescriptive",
        "Atlassian JIRA",
        "Azure Boards",
        "Microfocus Octane",
        "GitLab"
      ],
      sprintBacklogTool: [
        "Prescriptive",
        "Atlassian JIRA",
        "Azure Boards",
        "Microfocus Octane",
        "GitLab"
      ],
      projectMgmtTool: ["Prescriptive", "Microfocus Octane", "GitLab"],
      releaseMgmtTool: ["Prescriptive", "CloudBees Flow", "GitLab", "Azure Release Pipelines"],
      serviceMgmtTool: ["Prescriptive", "Service Now", "Remedy", "Helix"],
      catalog: {
        framework: ["Prescriptive", "Scrum", "Kanban", "SAFe"]
      }
    },
    integrateConfig: {
      sourceCodeManager: ["Prescriptive", "GitHub", "GitLab", "BitBucket"],
      testingTool: ["Prescriptive", "SonarQube", "Selenium", "Microfocus UFT"],
      catalog: {
        serverType: ["VM", "Container"],
        loadBalancer: ["Prescriptive", "Nginx", "Azure", "AWS", "Google"],
        apiGateway: ["Prescriptive", "Netflix Zuul", "Azure API", "AWS API", "ApiGee", "Kong"],
        serviceDirectory: [
          "Prescriptive",
          "Consul",
          "Zookeper",
          "doozerd",
          "etcd",
          "Eureka",
          "Istio",
          "Linkerd2"
        ],
        containerOrchestrator: ["Prescriptive", "Kubernetes", "Swarm", "Mesos"],
        ciTool: ["Prescriptive", "Cloudbees", "Azure", "Bamboo", "GitLab", "AWS", "OpenShift"],
        tShirtSize: [
          "2 vcpu , 4 GB , 50 GB Storage",
          "2 vcpu , 8 GB , 100 GB Storage",
          "2 vpcu , 16 GB and 200 GB Storage"
        ],
        envType: ["Development", "Test", "Staging", "Production"]
      },
      bundle: bundles
    },
    secureConfig: {
      catalog: {
        standards: ["Prescriptive", "PCI DSS", "HIPA", "NIST"],
        siem: ["Prescriptive", "TwistLock"],
        sast: ["Prescriptive", "Microfocus Fortify"],
        dast: ["Prescriptive", "Microfocus Fortify"],
        rasp: ["Prescriptive", "Microfocus Fortify"]
      }
    },
    deployConfig: {
      catalog: {
        configTool: ["Prescriptive", "Ansible", "Salt", "Puppet", "Chef"],
        cloudType: ["Prescriptive", "AWS", "Azure", "GCP", "Oracle Cloud"],
        deploy: ["Prescriptive", "AWS Deploy", "Terraform", "Azure Deploy", "Ansible"],
        orchestrate: ["Prescriptive", "Kubernetes", "Swarm"],
        aimonitor: ["Prescriptive", "Dynatrace", "Zabbix"],
        cmonitor: ["Prescriptive", "Prometheus", "Grafana"]
      }
    }
  },
  { upsert: true },
  function(err, data) {
    console.log("created configuration items and catalog");
  }
);

module.exports.findConfiguration = configId => {
  return new Promise(function(resolve, reject) {
    ConfigItemModel.find({ configId: configId }, function(err, data) {
      if (err || data === null) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

let prespectiveDefaultValues = new ConfigItemModel({
  configId: 2,
  collaborateConfig: {
    productBacklogTool: "Atlassian JIRA",
    sprintBacklogTool: "Atlassian JIRA",
    projectMgmtTool: "Microfocus Octane",
    releaseMgmtTool: "CloudBees Flow",
    serviceMgmtTool: "Service Now",
    catalog: {
      framework: "SAFe"
    }
  },
  integrateConfig: {
    sourceCodeManager: "GitLab",
    testingTool: "Selenium",
    catalog: {
      loadBalancer: "Nginx",
      apiGateway: "Netflix Zuul",
      serviceDirectory: "Consul",
      containerOrchestrator: "Kubernetes",
      ciTool: "Cloudbees"
    },
    bundle: [
      {
        lang: { name: "Java", buildTool: "Maven" },
        web: { os: "Linux", name: "Nginx" },
        app: { os: "Linux", name: "Apache Tomcat" },
        db: { os: "Windows", name: "MS SQL" }
      }
    ]
  },
  secureConfig: {
    catalog: {
      sast: "Microfocus Fortify",
      dast: "Microfocus Fortify",
      rasp: "Microfocus Fortify",
      siem: "TwistLock",
      standards: "NIST"
    }
  },
  deployConfig: {
    catalog: {
      configTool: "Ansible",
      cloudType: "Azure",
      deploy: "Terraform",
      orchestrate: "Kubernetes",
      aimonitor: "Dynatrace",
      cmonitor: "Prometheus"
    }
  }
});

ConfigItemModel.find({ configId: "2" }, function(err, docs) {
  if (docs.length) {
    console.log("Default Prespective exists already");
  } else {
    prespectiveDefaultValues.save(function(err) {
      if (err) console.log("error to create default Prescriptive item values", err);
      else console.log("created default Prescriptive item values");
    });
  }
});

module.exports.updatePrescriptive = function(config, defaultData, callback) {
  let update = {};
  if (defaultData.collaborateConfig) {
    update.collaborateConfig = defaultData.collaborateConfig;
  }
  if (defaultData.integrateConfig) {
    update.integrateConfig = defaultData.integrateConfig;
  }
  if (defaultData.secureConfig) {
    update.secureConfig = defaultData.secureConfig;
  }
  if (defaultData.deployConfig) {
    update.deployConfig = defaultData.deployConfig;
  }
  ConfigItemModel.updateOne(
    { configId: config },
    {
      $set: update
    },
    { upsert: true, new: true },
    function(err, data) {
      if (err || !data) {
        console.log(err);
        callback({ code: -1, message: "unable to update default Prescriptive" });
      } else {
        callback({ code: 0 });
      }
    }
  );
};
