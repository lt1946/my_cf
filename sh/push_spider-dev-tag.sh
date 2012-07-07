#!/bin/sh
echo ' tag_name , tag_desc ' && git tag -a "$1" -m "$2" &&  git push origin $1
