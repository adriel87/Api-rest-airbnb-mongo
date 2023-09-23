#!/bin/sh

echo "------------- CREATE FOLDER START -------------"

echo "1. Comprobando carpeta de trabajo"

DATA_FILE=mongo-data/
echo "2. $DATA_FILE"

if test -d "$DATA_FILE"; then
  echo "3. Directorios OK"
else
  echo "3. No existe los directorios necesarios"  
  echo "4. se va a crear la carpeta en el directorio raiz del proyecto mongo-data"
  mkdir mongo-data
fi

echo "------------- CREATE FOLDER END -------------"

