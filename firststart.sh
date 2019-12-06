#!/bin/sh
    echo installing utils
    npm install
    echo moveing install files
    cp ./install/start.sh ./start.sh
    echo starting server
    sh start.sh
