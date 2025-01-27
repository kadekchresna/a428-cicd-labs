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
                    cd /var/jenkins_home/workspace/react-app
                    tar -czf build.tar.gz -C build .
                    scp -o StrictHostKeyChecking=no build.tar.gz ${EC2_USER}@${EC2_HOST}:${APP_DIR}
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "cd ${APP_DIR} && tar -xzf build.tar.gz && rm -f build.tar.gz && cd /etc/nginx/conf.d && sudo mv react-app.conf.ommitted react-app.conf && sudo systemctl reload nginx"
                    echo 'Visit http://${EC2_HOST} to see the React application in action.'
                    """
                }
                sleep(60)
                sshagent(credentials: [SSH_KEY_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "cd /etc/nginx/conf.d && sudo mv react-app.conf react-app.conf.ommitted"
                    sudo systemctl reload nginx
                    """
                }
            }
        }
    }
}
