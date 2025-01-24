pipeline {
    agent {
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        EC2_USER = 'ec2-user' 
        EC2_HOST = 'ec2-54-86-110-35.compute-1.amazonaws.com' 
        SSH_KEY_PATH = '/aws-chresna.dev'
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
            agent { label 'build-in' } 
            steps {
                script {
                    sh """
                    echo 'Testing connection to EC2 instance using SSH key...'
                    ssh -i ${SSH_KEY_PATH} ${EC2_USER}@${EC2_HOST} echo 'Connection Successful'
                    """
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         sh './jenkins/scripts/deliver.sh'
        //         sleep 60
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }
    }
}
