FROM node:20-slim

RUN apt-get -y update
RUN apt-get -y install build-essential
RUN apt-get -y install curl

RUN curl https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz --output mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz
RUN tar -xvf mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz && mv mongodb-atlas-cli_1.3.0_linux_x86_64 atlas_cli
RUN chmod +x atlas_cli/bin/atlas
RUN mv atlas_cli/bin/atlas /usr/bin/

RUN npm i -g @nestjs/cli@7.4.1

CMD ["tail", "-f", "/dev/null"]

WORKDIR /app