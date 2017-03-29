# ptz-core-repository

[![Build Status](https://travis-ci.org/polutz/ptz-core-repository.svg)](https://travis-ci.org/polutz/ptz-core-repository)
[![codecov.io](http://codecov.io/github/polutz/ptz-core-repository/coverage.svg)](http://codecov.io/github/polutz/ptz-core-repository)
[![Dependency Status](https://gemnasium.com/polutz/ptz-core-repository.svg)](https://gemnasium.com/polutz/ptz-core-repository)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/polutz/ptz-core-repository)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

ptz-core-repository is a Polutz module.


## Prerequisites

- Node.
- Docker (for tests).

## NPM Global packages
```
    npm install -g ts-node typescript-node babel-cli
```

## Typings Global Packages 
```
    typings install dt~mocha --global --save
```

## Setup
```
    npm install   
```

## Test
```
    sudo docker build -t pcr . 
    sudo docker run -d --name cpcr2 pcr
    sudo docker exec cpcr2 npm test
```
