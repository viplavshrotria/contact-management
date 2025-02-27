import groovy.json.JsonSlurper
import java.security.*

// Function to parse JSON string to Map
def parseJson(jsonString) {
    def lazyMap = new JsonSlurper().parseText(jsonString)
    def m = [:]
    m.putAll(lazyMap)
    return m
}

// Function to parse JSON string to Array
def parseJsonArray(jsonString){
  def datas = readJSON text: jsonString
  return datas
}

// Function to extract a specific key's value from JSON string
def parseJsonString(jsonString, key){
  def datas = readJSON text: jsonString
  String Values = writeJSON returnText: true, json: datas[key]
  return Values
}

// Function to parse YAML string
def parseYaml(jsonString) {
  def datas = readYaml text: jsonString
  String yml = writeYaml returnText: true, data: datas['kubernetes']
  return yml
}

// Function to create a YAML file
def createYamlFile(data,filename) {
  writeFile file: filename, text: data
}

// Function to push data to collector
def pushToCollector(){
  print("Inside pushToCollector...........")
    def job_name = "$env.JOB_NAME"
    def job_base_name = "$env.JOB_BASE_NAME"
    String metaDataProperties = parseJsonString(env.JENKINS_METADATA,'general')
    metadataVars = parseJsonArray(metaDataProperties)
    if(metadataVars.tenant != '' && metadataVars.lazsaDomainUri != ''){
      echo "Job folder - $job_name"
      echo "Pipeline Name - $job_base_name"
      echo "Build Number - $currentBuild.number"
      sh """curl -k -X POST '${metadataVars.lazsaDomainUri}/collector/orchestrator/devops/details' -H 'X-TenantID: ${metadataVars.tenant}' -H 'Content-Type: application/json' -d '{"jobName" : "${job_base_name}", "projectPath" : "${job_name}", "agentId" : "${metadataVars.agentId}", "devopsConfigId" : "${metadataVars.devopsSettingId}", "agentApiKey" : "${metadataVars.agentApiKey}", "buildNumber" : "${currentBuild.number}" }' """
    }
}

def agentLabel = "${env.JENKINS_AGENT == null ? "":env.JENKINS_AGENT}"

pipeline {
  agent { label agentLabel }
  environment {
    DEFAULT_STAGE_SEQ = "'Initialization','Build','UnitTests','SonarQubeScan','BuildContainerImage','PublishContainerImage','Deploy','FunctionalTests','Destroy'"
    CUSTOM_STAGE_SEQ = "${DYNAMIC_JENKINS_STAGE_SEQUENCE}"
    PROJECT_TEMPLATE_ACTIVE = "${DYNAMIC_JENKINS_STAGE_NEEDED}"
    LIST = "${env.PROJECT_TEMPLATE_ACTIVE == 'true' ? env.CUSTOM_STAGE_SEQ : env.DEFAULT_STAGE_SEQ}"
  }
  stages {
    stage('Initialization') {
      agent { label agentLabel }
      steps {
        script {
          def listValue = "$env.LIST"
          def list = listValue.split(',')
          print(list)

          // Extracting metadata
          String metaDataProperties = parseJsonString(env.JENKINS_METADATA,'general')
          metadataVars = parseJsonArray(metaDataProperties)
          
          if(metadataVars.repoName == ''){
              metadataVars.repoName = env.RELEASE_NAME
          }

          env.CONTEXT = metadataVars.contextPath
          env.TESTCASEREPOSITORYURL = metadataVars.testcaseRepositoryUrl
          env.TESTCASEREPOSITORYBRANCH = metadataVars.testcaseRepositoryBranch
          env.SOURCECODECREDENTIALID = metadataVars.sourceCodeCredentialId
          env.TESTCASECOMMAND = metadataVars.testcaseCommand
          env.TESTINGTOOLTYPE = metadataVars.testingToolType
          env.BROWSERTYPE = metadataVars.browserType
        }
      }
    }
    
    stage('Build') {
      steps {
        script {
          echo "Building Application..."
        }
      }
    }

    stage('Build Container Image') {
      steps {
        script {
          echo "Building Container Image..."
          sh 'docker build -t "$REGISTRY_URL:$BUILD_TAG" -t "$REGISTRY_URL:latest" --build-arg DEFAULT_PORT=$SERVICE_PORT --build-arg CONTEXT=$CONTEXT -f Dockerfile .'
        }
      }
    }

    stage('Publish Container Image') {
      steps {
        script {
          echo "Publishing Container Image..."
          withCredentials([usernamePassword(credentialsId: "$ARTIFACTORY_CREDENTIALS", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh 'docker login -u "$USERNAME" -p "$PASSWORD" "$REGISTRY_URL"'
            sh 'docker push "$REGISTRY_URL:$BUILD_TAG"'
            sh 'docker push "$REGISTRY_URL:latest"'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          echo "Deploying Application..."
        }
      }
    }
  }
  post {
    always {
      pushToCollector()
      sh 'docker rmi $REGISTRY_URL:$BUILD_TAG $REGISTRY_URL:latest || true'
    }
  }
}
