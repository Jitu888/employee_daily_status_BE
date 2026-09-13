```groovy
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'jiterv/employee_daily_status_be:latest'
        CONTAINER_NAME = 'employee_daily_status'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      --platform linux/amd64 \
                      -t ${DOCKER_IMAGE} .
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred-id',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                          --username "$DOCKER_USERNAME" \
                          --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker push ${DOCKER_IMAGE}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Stopping old container..."

                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    echo "Pulling latest image..."

                    docker pull ${DOCKER_IMAGE}

                    echo "Starting new container..."

                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      --restart unless-stopped \
                      -p 3000:3000 \
                      ${DOCKER_IMAGE}

                    echo "Deployment completed."

                    docker ps --filter "name=${CONTAINER_NAME}"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
```
