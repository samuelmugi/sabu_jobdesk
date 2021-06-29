docker stop saqlever/sabu_job_desk:v1

docker rm saqlever/sabu_job_desk:v1

docker rmi saqlever/sabu_job_desk:v1

docker build -t saqlever/sabu_job_desk:v1 .

docker run  -d 	-p 9595:9595  saqlever/sabu_job_desk:v1