# /bin/bash

cp ./src/config/config-prod.js ./src/config/config.js

react-scripts build

cp ./build/index.html ./build/404.html
