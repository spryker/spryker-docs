---
title: Troubleshooting
originalLink: https://documentation.spryker.com/v4/docs/spryker-in-docker-troubleshooting
redirect_from:
  - /v4/docs/spryker-in-docker-troubleshooting
  - /v4/docs/en/spryker-in-docker-troubleshooting
---

In this document, you will find solutions to common issues related to running Spryker in Docker.

## Docker Demon is Not Running

**when** running the `docker/sdk up` console command, you see an error similar to this:
```shell
Error response from daemon: Bad response from Docker engine
```

**then**

1. Make sure Docker demon is running.
2. Run `docker/sdk up` again.

## HTTP/HTTPS Port is Already Occupied on Host

**when** running the `docker/sdk up` console command, you see an error similar to this:
```shell
ERROR: for nginx_frontend Cannot start service nginx_frontend: driver failed programming external connectivity on endpoint spryker_nginx_frontend_1 (e4fdb360f6c9a3243c0a88fa74f8d377325f65b8cd2340b2dacb51377519c1cf): Error starting userland proxy: Bind for 0.0.0.0:80: unexpected error (Failure EADDRINUSE)
```

**then**

1. Check what process occupies the port:
```shell
sudo lsof -nPi:80 | grep LISTEN
```
2. Stop the process or make it use a different port.
3. Run `docker/sdk up` again.

## Docker Sync

**when** you see an error similar to this after running `docker-sync clean`:
```shell
docker: Error response from daemon: Conflict. The container name "/data-sync" is already in use by container "47dd708a7a7f9550390432289bd85fe0e4491b080748fcbba7ddb3331de2c7e7". You have to remove (or rename) that container to be able to reuse that name.
```

**then**

1. Run `docker-sync clean`.
2. Run `docker/sdk up` again.
    ***
**when**
you get an error similar to this:
```shell
Unable to find image "eugenmayer/unison:hostsync_@.2' Locally
docker: Error response from daemon: manifest for eugenmayer/unison:hostsync_@.2 not found: manifest unknown: manifest unknown.
```  
    
**then**
Update docker-sync:
```shell
gem install docker-sync
```  
## Xdebug Does Not Work
**when** 
Xdebug does not work.
**then**
1. Make sure your IDE is listening to the port 9000.
2. Get into any application container:
```shell
$ docker exec -i spryker_zed_1 bash
```
3. Check that the `xdebug` extension is active:
```shell
$ docker/sdk cli php -m
```
4. Check if the host is accessible from the container:
```shell
$ nc -zv ${SPRYKER_XDEBUG_HOST_IP} 9000
```
***
**when**

PHP xdebug extension is not active.

**then**

Exit the container and run `sdk restart -x`
***
**when**

`nc` command does not give any output.

**then**

[Contact us](https://support.spryker.com/hc/en-us).
***
**when**

`nc` command tells that the port is opened.

**then**

1. Exit the container.
2. Check what process occupies the port by running the command:
```shell
sudo lsof -nPi:9000 | grep LISTEN
```
3. Make sure it is your IDE.

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
