# Devlite App - v3.0 Challenge 3 - Catalogz

## 1. Overview
This bundle includes:
*   Angular App
*   Express App

## 2. Configuration
The below configuration are maintained in the config/index.js file. This needs to be updated based on target environment.
*   JWT secret key
*   DB URL (Mongo)

## 3.  Building and Running
### Step 1: build angular app. 
    go to devlite-app (subfolder of main app folder)
    delete node_modules folder
    sudo npm install
    sudo npm run build


### Step 2: build api
    go to app home
    delete node_modules folder
    sudo npm install

### Step 3: start app
    go to app home
    sudo npm start

## 4. API Testing

POST http://localhost:9001/api/v3/org
content-type: application/json

{
    "orgName": "WIPRO"
}

POST http://localhost:9002/api/v3/org/user/login
content-type: application/json

{
    "username": "WIPROAdmin",
    "password": "admin@123"
}

POST http://localhost:9001/api/v3/proxy
content-type: application/json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjAwNjQxMThhNjcyNzMxYjUyNjA0ZCIsInVzZXJuYW1lIjoiV0lQUk9BZG1pbiIsImlhdCI6MTU4MzM1MTM5MywiZXhwIjoxNTgzNDM3NzkzfQ.YcZ6_A3SB9YSRvdjBg9-jhXloA3BjsPhrBTEyzPMAkI

### Get Organizations
GET http://azuredevops.wiprodevlite.com/_apis/projectCollections?
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq


### Get Projects
POST http://azuredevops.wiprodevlite.com/DefaultCollection/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1
content-type: application/json
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq

{
   "contributionIds":[
      "ms.vss-tfs-web.project-plus-product-data-provider"
   ],
   "dataProviderContext":{
      "properties":{
         "sourcePage":{
            "url":"http://azuredevops.wiprodevlite.com/DefaultCollection",
            "routeId":"ms.vss-tfs-web.suite-me-page-route",
            "routeValues":{
               "view":"projects",
               "controller":"ContributedPage",
               "action":"Execute",
               "serviceHost":"208a5b5a-6930-42e4-9358-f5e96dcc5d67 (DefaultCollection)"
            }
         }
      }
   }
}

### Get Repos
GET http://azuredevops.wiprodevlite.com/DefaultCollection/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1/_apis/git/repositories?api-version=4.1
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq


### Get Branches
GET http://azuredevops.wiprodevlite.com/DefaultCollection/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1/_apis/git/repositories/ea67b3f6-1ed1-4906-96d3-2068d3b145f8/refs?filter=heads
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq

### Get Metrics - Build
GET http://azuredevops.wiprodevlite.com/DefaultCollection/Devlite/_apis/build/Metrics/Daily?minMetricsTime=2020-03-09T11%3A15%3A00.041Z
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq

### Get Metrics - Deployments
POST http://azuredevops.wiprodevlite.com/DefaultCollection/_apis/Contribution/HierarchyQuery/project/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq
Accept: application/json;api-version=5.0-preview.1;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true
Content-Type: application/json

{"contributionIds":["ms.vss-releaseManagement-web.metrics-data-provider"],"dataProviderContext":{"properties":{"minmetricstime":"2020-03-09T00:00:00.000Z","operation":"getdeploymentmetrics","sourcePage":{"url":"http://azuredevops.wiprodevlite.com/DefaultCollection/DevLite","routeId":"ms.vss-tfs-web.project-overview-route","routeValues":{"project":"DevLite","controller":"Apps","action":"ContributedHub","serviceHost":"208a5b5a-6930-42e4-9358-f5e96dcc5d67 (DefaultCollection)"}}}}}

### Get Metrics - Repo Info
POST http://azuredevops.wiprodevlite.com/DefaultCollection/_apis/Contribution/HierarchyQuery/project/d1fef8f8-1227-4f5d-ae12-472f99cfd7c1  
Accept: application/json;api-version=5.0-preview.1;excludeUrls=true;enumsAsNumbers=true;msDateFormat=true;noArrayWrap=true" -H 
content-type: application/json 
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq

{"contributionIds":["ms.vss-code-web.code-metrics-data-provider-verticals"],"dataProviderContext":{"properties":{"numOfDays":7,"sourcePage":{"url":"http://azuredevops.wiprodevlite.com/DefaultCollection/DevLite","routeId":"ms.vss-tfs-web.project-overview-route","routeValues":{"project":"DevLite","controller":"Apps","action":"ContributedHub","serviceHost":"208a5b5a-6930-42e4-9358-f5e96dcc5d67 (DefaultCollection)"}}}}}

### Get Metrics - Build Time
GET http://azuredevops.wiprodevlite.com/DefaultCollection/DevLite/_apis/build/builds?definitions=15&statusFilter=2&top=10&queryOrder=3c
Authorization: Basic Administrator:qa75a2hoasmnhh3ybrmuqhjufykdxljytgjoquzgbxnoklcy7ilq

## Gitlab

### Get Projects
GET https://gitlabproduction.wiprodevlite.com/api/v4/users/root/projects
PRIVATE-TOKEN: JgEkgHTzKRTC15rg_hkq

### Get Branches
GET https://gitlabproduction.wiprodevlite.com/api/v4/projects/9/repository/branches
PRIVATE-TOKEN: JgEkgHTzKRTC15rg_hkq

### Activate pipeline
POST https://gitlabproduction.wiprodevlite.com/api/v4/projects/9/pipeline
PRIVATE-TOKEN: JgEkgHTzKRTC15rg_hkq

ref=release3

### Get Metrics
GET https://gitlabproduction.wiprodevlite.com/api/v4/projects/9/pipelines
PRIVATE-TOKEN: JgEkgHTzKRTC15rg_hkq