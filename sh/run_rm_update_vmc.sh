#!/bin/bash

cd .. && rm -rf my_cf && git clone git://github.com/lt1946/my_cf.git && cd my_cf && git remote rm origin && git remote add origin  git@github.com:lt1946/my_cf.git &&  vmc update

