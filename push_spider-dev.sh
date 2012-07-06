#!/bin/sh
git add * && git commit -a -m "$1" && echo 'ffffffgg' | git push origin spider-dev
