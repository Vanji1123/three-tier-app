pipeline {

    agent any

    environment {

        AWS_REGION = 'ap-south-1'

        ECR_BACKEND = '806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-backend'

        ECR_FRONTEND = '806997205166.dkr.ecr.ap-south-1.amazonaws.com/3-tier-frontend'

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
                    sh 'docker build -t $ECR_BACKEND:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $ECR_FRONTEND:latest .'
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
                sh 'docker push $ECR_BACKEND:latest'
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push $ECR_FRONTEND:latest'
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                helm upgrade --install three-tier-app \
                helm/three-tier-app \
                -n three-tier
                '''
            }
        }

    }

}