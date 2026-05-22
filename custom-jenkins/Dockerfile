FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
curl \
unzip \
docker.io

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
chmod +x kubectl && \
mv kubectl /usr/local/bin/

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
unzip awscliv2.zip && \
./aws/install

# Install Terraform
RUN curl -LO https://releases.hashicorp.com/terraform/1.9.8/terraform_1.9.8_linux_amd64.zip && \
unzip terraform_1.9.8_linux_amd64.zip && \
mv terraform /usr/local/bin/ && \
rm terraform_1.9.8_linux_amd64.zip

USER jenkins
