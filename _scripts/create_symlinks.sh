#!/bin/sh

# find "$1" -type d -name "$2" -exec sh -c 'directory="{}"; ln -s ./$(basename $directory) $directory/../latest ; ' \;
echo "Linking $2 version as 'latest'"
find "$1" -type d -name "$2" -exec sh -c 'directory="{}"; rm -rf $directory/../latest 2> /dev/null ; ln -s ./$(basename $directory) $directory/../latest ; echo $directory; ls -la $directory/../ ' \;