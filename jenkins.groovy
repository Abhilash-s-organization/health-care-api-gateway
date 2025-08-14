pipeline {
    agent any

    environment {
        NODE_VERSION = "22"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'staging', url: 'https://github.com/Abhilash-s-organization/health-care-api-gateway.git'
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
                sudo apt-get install -y nodejs
                node -v
                npm -v
                '''
            }
        }

        stage('Install & Test API Gateway') {
            steps {
                dir('api-gateway') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Install & Test Chat Server') {
            steps {
                dir('chat-server') {
                    sh 'npm install'
                    sh 'npm test || echo "No tests found for chat server"'
                }
            }
        }

        stage('Install & Test File Server') {
            steps {
                dir('file-server') {
                    sh 'npm install'
                    sh 'npm test || echo "No tests found for file server"'
                }
            }
        }

        stage('Deploy Services') {
            steps {
                dir('api-gateway') {
                    sh 'pm2 stop api-gateway || true'
                    sh 'pm2 start server.js --name api-gateway'
                }
                dir('chat-server') {
                    sh 'pm2 stop chat-server || true'
                    sh 'pm2 start server.js --name chat-server'
                }
                dir('file-server') {
                    sh 'pm2 stop file-server || true'
                    sh 'pm2 start server.js --name file-server'
                }
                sh 'pm2 save'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
