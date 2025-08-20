pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        CHAT_SERVICE = "http://localhost:4000"   // or your chat server URL
        FILE_SERVICE = "http://localhost:5000"   // example
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install
                '''
            }
        }

        stage('test') {
            steps {
                sh '''
                    NODE_ENV=test npm test
                '''
            }
        }

    }

}
