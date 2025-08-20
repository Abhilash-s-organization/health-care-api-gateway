pipeline {
    agent any
    tools {
        nodejs "NodeJS"
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
                    npm test
                '''
            }
        }

    }

}
