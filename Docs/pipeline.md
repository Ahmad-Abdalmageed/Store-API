# Store Front API

Store Front API is deployed using  CircleCI which is a  CI/CD  Tool . 

## Pipeline

Defined at [.circleci](../.circleci) is the Process the Project goes through from Pushing new code to the Repository until it reached Production. The Final Deployed Version of the Application is Tested and Built Automatically each Update. 

### Jobs

The First Job is Build , it is the First job so it includes Installing the Server Dependencies using the Command `instal_server`, the last step, `persist_to_workspace` is used to preserve the installed modules in the following jobs. The other two jobs are Testing and Deployment both are attached to the persisted workspace, in the Deploy Step we configure the AWS CLI and the EB CLI. Both the AWS ID and Secret Keys are added to the Project's Environment Variables.

```yaml
# ........................ CI/CD Jobs ..................................
# Each Step in CI/CD Workflow below is defined here, using Circle CI   .
# persist_to_workspace to keep the build files for testing and deploy  .
# ......................................................................
jobs:
  build:
    docker:
      - image: cimg/base:stable

    steps:
      - node/install
      - node/install-yarn
      - checkout
      - install_server
      - build_server
      - persist_to_workspace:
          root: ./
          paths:
            - ./
  test:
    docker:
      - image: cimg/base:stable
    steps:
      - attach_workspace:
          at: ./
      - node/install
      - node/install-yarn
      - test_server
  deploy:
    docker:
      - image: "cimg/base:stable"
    steps:
      - attach_workspace:
          at: ./
      - node/install
      - node/install-yarn
      - aws-cli/setup
      - eb/setup
      - list_dirs
      - deploy_server
```

## Latest Build 

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Ahmad-Abdalmageed/Store-API/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Ahmad-Abdalmageed/Store-API/tree/master)

![ci](./imgs/ci.png)

![pipeline](./imgs/pipeline.png)