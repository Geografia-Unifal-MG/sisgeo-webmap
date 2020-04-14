#!/bin/bash

sudo docker run --rm --name sisgeo -p 8081:80 geografiaunifal/sisgeo:$1
