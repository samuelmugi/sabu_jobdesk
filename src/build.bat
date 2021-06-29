docker stop sabu_job_desk

docker rm sabu_job_desk

docker rmi sabu_job_desk

docker build -t sabu_job_desk .

docker run -d --name sabu_job_desk -p 9595:9595  sabu_job_desk