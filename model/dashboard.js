var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// jenkins
var JenkinsSchema = new Schema({
    customer: String,
    executed: Boolean,
    averageTimings: [Number],
    currentTimings: [Number]
});

var JenkinsModel = mongoose.model('jenkins', JenkinsSchema);
JenkinsModel.updateOne({ customer: 'Optimus' },
    {
        executed: false,
        averageTimings: [338, 1000, 23000, 31000, 22000, 54000, 15000, 516],
        //currentTimings: [100, 100, 100, 100, 100, 100, 100, 100],
        currentTimings: [859,1000,22000,30000,22000,55000,15000,717]
    },
    { upsert: true }, function (err, data) {
        console.log('created jenkins summary');
    });

// sonar
var SonarIssueSchema = new Schema({
    issueId: String,
    category: String,
    location: String,
    title: String,
    when: String,
    line: String,
    type: String,
    severity: String,
    status: String,
    assignStatus: String,
    effort: String,
    tag: String
});

var SonarIssueModel = mongoose.model('issue', SonarIssueSchema);
SonarIssueModel.updateOne({ issueId: '1' },
    {
        category: 'development',
        location: 'devlite/src/service/app/dashboard/sonar-view/sonar-view.component.ts',
        title: 'This block of commented-out lines of code should be removed.',
        when: '3 days ago',
        line: 'L20',
        type: 'Code Smell',
        severity: 'Major',
        status: 'Open',
        assignStatus: 'Assinged',
        effort: '20 min effort',
        tag: 'performance'
    },
    { upsert: true }, function (err, data) {
        console.log('created sonar summary');
    });

SonarIssueModel.updateOne({ issueId: '2' },
    {
        category: 'development',
        location: 'devlite/src/service/app/dashboard/sonar-view/sonar-view.component.ts',
        title: 'This block of commented-out lines of code should be removed.',
        when: '3 days ago',
        line: 'L20',
        type: 'Code Smell',
        severity: 'Minor',
        status: 'In-Progress',
        assignStatus: 'Assinged',
        effort: '20 min effort',
        tag: 'performance'
    },
    { upsert: true }, function (err, data) {
        console.log('created sonar summary');
    });

SonarIssueModel.updateOne({ issueId: '3' },
    {
        category: 'security',
        location: 'devlite/src/service/app/dashboard/sonar-view/sonar-view.component.ts',
        title: 'This block of commented-out lines of code should be removed.',
        when: '3 days ago',
        line: 'L20',
        type: 'Vulnerability',
        severity: 'Info',
        status: 'Open',
        assignStatus: 'Assinged',
        effort: '20 min effort',
        tag: 'performance'
    },
    { upsert: true }, function (err, data) {
        console.log('created sonar summary');
    });

// bill summary
var BillSummarySchema = new Schema({
    type: String,
    costDrivers: [Number],
    consumptionIndex: [Number],
    consumptionAnalysis: [Number],
    subscriptionIndex: [Number],
    subscriptionAnalysis: [Number],
});

var BillSummaryModel = mongoose.model('bill', BillSummarySchema);

BillSummaryModel.updateOne(
    { type: 'bill-summary' },
    {
        "costDrivers": [10, 10, 10, 70],
        "consumptionIndex": [90, 10],
        "consumptionAnalysis": [250, 900, 300],
        "subscriptionIndex": [20, 80],
        "subscriptionAnalysis": [250, 900, 300]
    },
    { upsert: true }, function (err, data) {
        console.log('created bill summary');
    });

// dev summary
var DevSummarySchema = new Schema({
    type: String,
    deploymentFrequencyIndex: [Number],
    deploymentFrequency: [Number],
    qualityIndex: [Number],
    qualityIssues: [Number],
    testingQualityIndex: [Number],
    testingBugs: [Number]
});
var DevSummaryModel = mongoose.model('dev', DevSummarySchema);

DevSummaryModel.updateOne(
    { type: 'dev-summary' },
    {
        "deploymentFrequencyIndex": [100, 0],
        "deploymentFrequency": [1, 1, 1],
        "qualityIndex": [84, 16],
        "qualityIssues": [19, 2, 125],
        "testingQualityIndex": [15, 85],
        "testingBugs": [22, 24, 26],
    },
    { upsert: true }, function (err, data) {
        console.log('created dev summary');
    });


// heal summary
var HealSummarySchema = new Schema({
    type: String,
    autoResolutionIndex: [Number],
    autoResolvedIncidents: [Number],
    escalationIndex: [Number],
    escalatedIncidents: [Number],
});

var HealSummaryModel = mongoose.model('heal', HealSummarySchema);

HealSummaryModel.updateOne(
    { type: 'heal-summary' },
    {
        "autoResolutionIndex": [80, 20],
        "autoResolvedIncidents": [0, 17, 199],
        "escalationIndex": [10, 90],
        "escalatedIncidents": [2, 72, 21]
    },
    { upsert: true }, function (err, data) {
        console.log('created heal summary');
    });

// ops summary
var OpsSummarySchema = new Schema({
    type: String,
    deployServerIndex: [Number],
    deployServerLeadTime: [Number],
    deployServicesIndex: [Number],
    deployServicesLeadTime: [Number],
});

var OpsSummaryModel = mongoose.model('ops', OpsSummarySchema);

OpsSummaryModel.updateOne(
    { type: 'ops-summary' },
    {
        "deployServerIndex": [30, 70],
        "deployServerLeadTime": [72, 24, 0.2],
        "deployServicesIndex": [20, 80],
        "deployServicesLeadTime": [92, 24, 0.5]
    },
    { upsert: true }, function (err, data) {
        console.log('created ops summary');
    });

// perf summary
var PerfSummarySchema = new Schema({
    type: String,
    envHealthIndex: [Number],
    envHealth: [Number],
    perfIssueIndex: [Number],
    perfIssues: [Number],
    appPerfIndex: [Number],
    appPerfIssues: [Number],
});

var PerfSummaryModel = mongoose.model('perf', PerfSummarySchema);

PerfSummaryModel.updateOne(
    { type: 'perf-summary' },
    {
        "envHealthIndex": [100, 0],
        "envHealth": [2, 2, 2],
        "perfIssueIndex": [81, 19],
        "perfIssues": [72, 83, 390],
        "appPerfIndex": [37, 63],
        "appPerfIssues": [17, 22, 27]
    },
    { upsert: true }, function (err, data) {
        console.log('created perf summary');
    });

// sec summary
var SecSummarySchema = new Schema({
    type: String,
    vulnerabilityIndex: [Number],
    codeVulnerabilities: [Number],
    runtimeVulnerabilityIndex: [Number],
    runtimeVulnerabilities: [Number],
    securityIncidentIndex: [Number],
    securityIncidents: [Number]
});

var SecSummaryModel = mongoose.model('sec', SecSummarySchema);

SecSummaryModel.updateOne(
    { type: 'sec-summary' },
    {
        "vulnerabilityIndex": [85, 15],
        "codeVulnerabilities": [1, 2, 7],
        "runtimeVulnerabilityIndex": [11, 89],
        "runtimeVulnerabilities": [31, 37, 41],
        "securityIncidentIndex": [5, 95],
        "securityIncidents": [37, 6, 39]
    },
    { upsert: true }, function (err, data) {
        console.log('created sec summary');
    });



module.exports.getBillSummary = function (callback) {
    BillSummaryModel.findOne({ type: "bill-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getDevSummary = function (callback) {
    DevSummaryModel.findOne({ type: "dev-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getSonarIssues = function (category, callback) {
    SonarIssueModel.find({ category }, function (err, docs) {
        if (err || docs === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, docs });
        }
    })
}

module.exports.getHealSummary = function (callback) {
    HealSummaryModel.findOne({ type: "heal-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getOpsSummary = function (callback) {
    OpsSummaryModel.findOne({ type: "ops-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getPerfSummary = function (callback) {
    PerfSummaryModel.findOne({ type: "perf-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getSecSummary = function (callback) {
    SecSummaryModel.findOne({ type: "sec-summary" }, function (err, doc) {
        if (err || doc === null) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    })
}

module.exports.getJenkinsSummary = function (callback) {
    JenkinsModel.findOne({ customer: "Optimus" }, function (err, doc) {
        if (err) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0, doc });
        }
    });
}

module.exports.resetJenkinsSummary = function (callback) {

    JenkinsModel.updateOne({ customer: "Optimus" }, {
        executed: false,
        averageTimings: [338, 1000, 23000, 31000, 22000, 54000, 15000, 516],
        //currentTimings: [100, 100, 100, 100, 100, 100, 100, 100],
        currentTimings: [859,1000,22000,30000,22000,55000,15000,717]
    }, function (err, result) {
        if (err) {
            callback({ code: -1 })
        } else {
            callback({ code: 0 });
        }
    });
}

module.exports.completeJenkins = function (callback) {
    JenkinsModel.updateOne({ customer: "Optimus" }, { executed: true }, function (err, result) {
        if (err) {
            callback({ code: -1, message: 'unable to find any details' })
        } else {
            callback({ code: 0 });
        }
    })
}