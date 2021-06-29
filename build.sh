nodeNAME=`cat nodeName.txt`

echo "container Name: "${nodeNAME}

docker stop ${nodeNAME}

docker rm ${nodeNAME}

docker rmi ${nodeNAME}

docker build -t ${nodeNAME} .

docker run --name ${nodeNAME} -d \
	-p 7070:7070 \
	-v /opt/LOGS/itax-app:/home/node/app/logs \
    --network=area51 \
	${nodeNAME}
