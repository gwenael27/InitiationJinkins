pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'mon-app-express'
        DOCKER_TAG = 'latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis le repository
                checkout scm
            }
        }
        
        stage('Installation des dépendances') {
            steps {
                // Installation des dépendances Node.js
                sh 'npm install'
            }
        }
        
        stage('Tests Unitaires') {
            steps {
                // Exécution des tests
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Construction de l'image Docker
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }
        
        stage('Run Docker Container') {
            steps {
                script {
                    // Arrêt et suppression du container existant s'il existe
                    sh '''
                        docker ps -q --filter "name=express-app" | grep -q . && docker stop express-app && docker rm express-app || echo "Pas de container à nettoyer"
                    '''
                    
                    // Démarrage du nouveau container
                    sh "docker run -d --name express-app -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
    
    post {
        failure {
            // Actions à effectuer en cas d'échec
            echo 'Le pipeline a échoué !'
        }
        success {
            // Actions à effectuer en cas de succès
            echo 'Le pipeline a réussi !'
        }
        always {
            // Nettoyage workspace
            cleanWs()
        }
    }
}