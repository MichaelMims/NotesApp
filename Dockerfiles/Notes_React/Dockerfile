FROM debian

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs subversion

## start
RUN svn checkout https://github.com/MichaelMims/NotesApp/trunk/front-end
RUN mkdir app 
RUN cp -r front-end /app

RUN cd /app/front-end && npm install

EXPOSE 5000
WORKDIR /app/front-end/
CMD npm run build && npm run production
## end