pipeline {

    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins-irsa

  containers:

  - name: docker
    image: docker:27.0.3
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock

  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
"""
            defaultContainer 'docker'
        }
    }

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPO_BACKEND = '806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-backend'
        ECR_REPO_FRONTEND = '806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-frontend'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $ECR_REPO_BACKEND:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $ECR_REPO_FRONTEND:latest .'
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin \
                806997205166.dkr.ecr.ap-south-1.amazonaws.com
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'docker push $ECR_REPO_BACKEND:latest'
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push $ECR_REPO_FRONTEND:latest'
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