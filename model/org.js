var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var encHelper = require("../helpers/encryption-helper");

var Release = new Schema({
  name: String,
  version: String
});

var Product = new Schema({
  name: String,
  releases: [Release]
});

var BusinessUnit = new Schema({
  name: String,
  products: [Product]
});

var User = new Schema({
  orgId: mongoose.ObjectId,
  username: { type: String, unique: true },
  password: String,
  role: String
});

var Tool = new Schema({
  value: String,
  deployment: String,
  url: String,
  license: String,
  certificate: String,
  username: String,
  password: String
});

var Bundle = new Schema({
  lang: { name: String, buildTool: String },
  web: { os: String, name: String },
  app: { os: String, name: String },
  db: { os: String, name: String }
});

var EnvConfig = new Schema({
  devNoInstance: Number,
  devTShirtSize: String,
  testNoInstance: Number,
  testTShirtSize: String,
  stagNoInstance: Number,
  stagTShirtSize: String,
  prodNoInstance: Number,
  prodTShirtSize: String
});

var Org = new Schema({
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
  devWorkbenchInfo: {
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
    repository: String,
    projectId: String,
    projectName: String,
    buName: String,
    buId: String,
  },
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
});

var UserModel = mongoose.model("users", User);
var OrgModel = mongoose.model("orgs", Org);

// create organization
module.exports.createOrg = function({ orgName }, callback) {
  var org = new OrgModel({
    orgName: orgName,
    businessUnits: [],
    almInfo: {
      productBacklogTool: {},
      sprintBacklogTool: {},
      projectMgmtTool: {},
      releaseMgmtTool: {},
      serviceMgmtTool: {},
      catalogFramework: ""
    },
    devWorkbenchInfo: {
      sourceCodeManager: {},
      testingTool: {},
      ciTool: {},
      envConfig: {},
      bundle: {
        lang: {},
        web: {},
        app: {},
        db: {}
      }
    },
    secureInfo: {
      siem: {},
      sast: {},
      dast: {},
      rasp: {},
      standard: ""
    },
    deployInfo: {
      configMgmtTool: {},
      cloudType: {},
      orchestrationTool: {},
      deployTool: {},
      aimonitor: {},
      cmonitor: {}
    }
  });

  org.save(function(err, doc) {
    if (err || doc === null) {
      console.log(err);
      callback({ code: -1, message: "Unable to create organization" });
    } else {
      var orgAdmin = new UserModel({
        orgId: doc._id,
        username: `${orgName}Admin`,
        password: encHelper.encrypt("admin@123"),
        role: "ADMIN"
      });
      orgAdmin.save(function(err, doc) {
        if (err || doc === null) {
          console.log(err);
          callback({ code: -1, message: "Unable to create organization" });
        } else {
          callback({ code: 0 });
        }
      });
    }
  });
};

module.exports.getOrgById = function(orgId, callback) {
  OrgModel.findById(orgId, function(err, doc) {
    if (err) callback({ code: -1, message: "Organization not found" });
    callback({ code: 0, org: doc });
  });
};

module.exports.getUsersByOrgId = function(orgId, callback) {
  UserModel.find({ orgId: orgId, role: "USER" }, "username", function(err, doc) {
    if (err) callback({ code: -1, message: "Invalid organization" });
    callback({ code: 0, users: doc });
  });
};

// delete user
module.exports.deleteUser = function(userId, callback) {
  UserModel.findByIdAndDelete(userId, function(err, doc) {
    if (err || doc === null) {
      console.log(err);
      callback({ code: -1, message: "Unable to delete user" });
    } else {
      callback({ code: 0 });
    }
  });
};

// create user
module.exports.createUser = function(orgId, { username, password }, callback) {
  var user = new UserModel({
    orgId: orgId,
    username: username,
    password: encHelper.encrypt(password || 'password'),
    role: "USER"
  });

  user.save(function(err, doc) {
    if (err || doc === null) {
      console.log(err);
      callback({ code: -1, message: "Unable to create user" });
    } else {
      callback({ code: 0 });
    }
  });
};

module.exports.getUserDetails = function(username, password, callback) {
  var query = { username: username, password: encHelper.encrypt(password) };
  UserModel.findOne(query, function(data, err) {
    callback(data, err);
  });
};

module.exports.getUserById = function(userId, callback) {
  UserModel.findById(userId, 'orgId', function(err, user) {
    callback(user, err);
  });
};

module.exports.getFullUserById = function(userId, callback) {
  UserModel.findById(userId, function(err, user) {
    callback(user, err);
  });
};

module.exports.updateOrg = function(orgId, data, callback) {
  OrgModel.findByIdAndUpdate(
    orgId,
    {
      businessUnits: data.businessUnits,
      almInfo: data.almInfo,
      devWorkbenchInfo: data.devWorkbenchInfo,
      secureInfo: data.secureInfo,
      deployInfo: data.deployInfo,
      integrateInfo: data.integrateInfo
    },
    {
      new: true
    },
    function(error, updated) {
      if (error || !updated) {
        console.log(error);
        callback({ code: -1, message: error });
      } else {
        callback({ code: 0, doc: updated });
      }
    }
  );
};
