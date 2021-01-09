FROM debian

RUN apt-get update && apt-get install -y wget gnupg

RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - \
    && echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN apt-get update && apt-get install -y mongodb-org && rm -rf /var/lib/apt/lists/*

VOLUME /data/db

EXPOSE 27017

CMD /usr/bin/mongod --bind_ip 0.0.0.0