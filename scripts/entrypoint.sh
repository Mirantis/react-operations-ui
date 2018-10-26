#!/bin/bash

ENV_FILE_DEFAULT=".env.production.default"
ENV_FILE=".env.production"
ENV_PREFIX="REACT_APP"

update_env_file() {
    local vars=$( env | grep '^'"$ENV_PREFIX" )

    # append vars from default env file to the $vars list if not already present
    while read -r line;
    do
        local file_var="${line%%=*}"
        if [[ $vars != *"$file_var"* ]]; then
            vars="${vars}\n${line}"
        fi
    done <"$ENV_FILE_DEFAULT"

    # dump vars list into target env file
    echo -e "$vars" >"$ENV_FILE"
}

echo "Preparing environment"
update_env_file

echo "Building"
npm run build --production

echo "Starting server"
serve -l 3000 -s build
