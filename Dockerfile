FROM node:8.12.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Prepare directory
WORKDIR /code

# Copy all local files into the image
COPY . .

RUN npm install

# Install and configure `serve`
RUN npm install -g serve

# run app
CMD ./scripts/entrypoint.sh