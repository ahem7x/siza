var router = require("express").Router();
var jwt = require("jsonwebtoken");
var org = require("../model/org");
var config = require("../config");
var configCatalogue = require("../model/configCatalogue");

router.get("/:orgId", function(req, res) {
  const { orgId } = req.params;
  org.getOrgById(orgId, function(response) {
    if (response.code === 0) {
      org.getUsersByOrgId(orgId, function(response1) {
        if (response.code === 0) {
          res.status(200).json({
            ...response,
            users: response1.users
          });
        } else {
          res.status(400).json(response1);
        }
      });
    } else {
      res.status(400).json(response);
    }
  });
});

router.post("/", function(req, res) {
  org.createOrg(req.body, function(response) {
    if (response.code === 0) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  });
});

router.post("/:orgId/user", function(req, res) {
  const { orgId } = req.params;

  org.createUser(orgId, req.body, function(response) {
    if (response.code === 0) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  });
});

router.delete("/:orgId/user/:userId", function(req, res) {
  const { userId } = req.params;

  org.deleteUser(userId, function(response) {
    if (response.code === 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  });
});

router.post("/user/login", function(req, res) {
  const { username, password } = req.body;
  org.getUserDetails(username, password, async function(err, data) {
    if (err || data === null) {
      res.status(401).json("Invalid user or credentials");
    } else {
      var token = jwt.sign({ id: data._id, username: data.username }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      var configItems, defaultPrescriptive;
      let allValuesconfigId = 1,
        defaultValueConfigId = 2;

      await configCatalogue
        .findConfiguration(allValuesconfigId)
        .then(response => {
          configItems = response[0];
        })
        .catch(err => {
          console.log("error to find configuration", err);
          configItems = {};
        });

      await configCatalogue
        .findConfiguration(defaultValueConfigId)
        .then(response => {
          defaultPrescriptive = response[0];
        })
        .catch(err => {
          console.log("error to find configuration", err);
          defaultPrescriptive = {};
        });

      org.getOrgById(data.orgId, function(orgDoc) {
        org.getUsersByOrgId(data.orgId, function(response1) {
          if (response1.code === 0) {
            res.status(200).send({
              token,
              username: data.username,
              role: data.role,
              orgId: data.orgId,
              org: orgDoc.org,
              users: response1.users,
              configuration: configItems,
              defaultPrescriptive: defaultPrescriptive
            });
          } else {
            res.status(400).json(response1);
          }
        });
      });
    }
  });
});

router.put("/:orgId", function(req, res) {
  const { orgId } = req.params;
  org.updateOrg(orgId, req.body, function(response) {
    if (response.code === 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  });
});

module.exports = router;
