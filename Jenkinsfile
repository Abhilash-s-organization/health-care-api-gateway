pipeline {
    agent any
    tools {
        nodejs "nodejs"
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
