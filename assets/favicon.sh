#!/usr/bin/env bash

magick favicon-256x256.png \
       favicon-192x192.png \
       favicon-128x128.png \
       favicon-64x64.png \
       favicon-32x32.png \
       -alpha off -colors 256 favicon.ico
