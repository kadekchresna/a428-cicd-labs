pipeline {
    agent {
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh '[ -d "node_modules" ] && rm -r node_modules || echo "node_modules does not exist"'
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                sh './jenkins/scripts/test.sh' 
            }
        }

        stage('Manual Approval') {
            steps {
                input message: 'Lanjutkan ke tahap Deploy?'
            }
        }

        stage('Deploy') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                sleep 60
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
