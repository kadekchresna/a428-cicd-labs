pipeline {
    agent {
        docker {
            image 'node:16-buster'
            args '-p 3000:3000 -v /aws-chresna.dev:/aws-chresna.dev:ro'
        }
    }
    environment {
        EC2_USER = 'ec2-user' 
        EC2_HOST = 'ec2-3-95-180-17.compute-1.amazonaws.com' 
        SSH_KEY_PATH = '/aws-chresna.dev'
    }
    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                // sh '[ -d "node_modules" ] && rm -r node_modules || echo "node_modules does not exist"'
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
                script {
                    // sh '''
                    // echo "Checking environment..."
                    // env
                    // echo "Checking shell..."
                    // command -v bash || command -v sh || echo "Shell is missing!"
                    // echo "Checking SSH..."
                    // command -v ssh || echo "SSH is missing!"
                    // echo "Listing workspace directory..."
                    // ls -la /var/jenkins_home/workspace
                    // '''
                    sh """
                    cat ${SSH_KEY_PATH}
                    echo 'Testing connection to EC2 instance using SSH key...'
                    ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} echo 'Connection Successful'
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
