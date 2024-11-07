# TP-INFO910

Baptiste Griva
Alexandre Desbos

L'application est un formulaire d'inscription, il y a un formulaire pour rentrer son nom et son adresse mail.
En validant, les informations sont stockées dans une base de données mongodb en local.
Il y a également en dessous du formulaire la liste des personnes inscrites.

Pour déployer l'application :
Il faut cloner le repository, puis se rendre dans le dossier TP-INFO910.
Il faut ensuite créer les containers avec les commandes :

docker build -t info910/backend ./backend
docker build -t info910/frontend ./frontend
docker-compose up --build

Pour kubernetes :

Il faut lancer minikube avec la commande : minikube start
Il faut ensuite charger les images docker créées :
minikube image load info910/backend  
minikube image load info910/frontend

Il faut ensuite appliquer les fichiers de déploiement :
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f mongodb-deployment.yaml

Pour finir, on peut lancer le service avec la commande :
minikube service frontend-service
