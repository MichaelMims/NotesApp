FROM debian

RUN apt-get update && apt-get install -y curl unzip
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs subversion

## start
RUN svn checkout https://github.com/MichaelMims/NotesApp/trunk/back-end
RUN mkdir app 
RUN cp -r back-end /app

RUN cd /app/back-end && npm install

# EXPOSE 3000
WORKDIR /app/back-end/
CMD npm run start