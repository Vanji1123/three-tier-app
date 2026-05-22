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
    - /kaniko/executor
    args:
    - --help
    tty: true

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
        ACCOUNT_ID = '806997205166'

        BACKEND_IMAGE = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/3-tier-backend:latest"
        FRONTEND_IMAGE = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/3-tier-frontend:latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Backend') {
            steps {
                container('kaniko') {
                    dir('backend') {
                        sh '''
                        mkdir -p /kaniko/.docker

                        cat > /kaniko/.docker/config.json <<EOF
{
  "credsStore": "ecr-login"
}
EOF

                        /kaniko/executor \
                          --context `pwd` \
                          --dockerfile Dockerfile \
                          --destination $BACKEND_IMAGE \
                          --verbosity=info
                        '''
                    }
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {
                    dir('frontend') {
                        sh '''
                        /kaniko/executor \
                          --context `pwd` \
                          --dockerfile Dockerfile \
                          --destination $FRONTEND_IMAGE \
                          --verbosity=info
                        '''
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                container('kaniko') {
                    dir('helm/three-tier-app') {
                        sh '''
                        helm upgrade --install three-tier-app . \
                        --namespace default
                        '''
                    }
                }
            }
        }
    }
}