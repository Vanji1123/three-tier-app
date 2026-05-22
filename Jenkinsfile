pipeline {

    agent {
        kubernetes {
            inheritFrom 'default'

            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins-irsa

  containers:

  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command:
    - sleep
    args:
    - 999999

    volumeMounts:
    - name: docker-config
      mountPath: /kaniko/.docker

  volumes:
  - name: docker-config
    emptyDir: {}
"""
            defaultContainer 'kaniko'
        }
    }

    environment {
        AWS_REGION = 'ap-south-1'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Backend') {
            steps {
                dir('backend') {
                    sh '''
                    mkdir -p /kaniko/.docker

                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin \
                    806997205166.dkr.ecr.ap-south-1.amazonaws.com

                    /kaniko/executor \
                      --context `pwd` \
                      --dockerfile Dockerfile \
                      --destination 806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-backend:latest
                    '''
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    /kaniko/executor \
                      --context `pwd` \
                      --dockerfile Dockerfile \
                      --destination 806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-frontend:latest
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                dir('helm/three-tier-app') {
                    sh 'helm upgrade --install three-tier-app .'
                }
            }
        }
    }
}