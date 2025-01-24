pipeline {
    agent {
        docker {
            image 'node:16-buster'
            args '-p 3000:3000'
        }
    }
    environment {
        EC2_USER = 'ec2-user' 
        EC2_HOST = 'ec2-3-95-180-17.compute-1.amazonaws.com' 
        APP_DIR = '/var/www/react-app'
        SSH_KEY_ID = 'ssh-aws-chresna.dev'
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
                sshagent(credentials: [SSH_KEY_ID]) {
                    sh """
                    tar -czf build.tar.gz /var/jenkins_home/workspace/react-app/build
                    scp build.tar.gz ${EC2_USER}@${EC2_HOST}:${APP_DIR}
                    ssh ${EC2_USER}@${EC2_HOST} << EOF
                        cd ${APP_DIR}
                        tar -xzf build.tar.gz
                        rm -f build.tar.gz
                    EOF
                    """
                }
                // script {
                    // sh """
                    // echo 'Testing connection to EC2 instance using SSH key...'
                    // tar -czf build.tar.gz /var/jenkins_home/workspace/react-app
                    // scp build.tar.gz ${EC2_USER}@${EC2_HOST}:${APP_DIR}
                    // ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                    //     cd ${APP_DIR}
                    //     tar -xzf build.tar.gz
                    //     rm -f build.tar.gz
                    //     # Restart web server or services if needed
                    // EOF
                    // """
                // }
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
