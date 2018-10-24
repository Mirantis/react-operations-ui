FROM node:8.12.0

ENV PATH /usr/src/app/node_modules/.bin:$PATH
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -p 3000 -s build
EXPOSE 3000

# Install all dependencies of the current project.
COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production

