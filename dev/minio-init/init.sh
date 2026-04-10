#!/bin/bash

mc alias set minio http://minio:9000 root password

mc admin user add minio example password
mc mb minio/example
mc admin policy create minio example /minio-init/example.json
mc admin policy attach minio example --user=example
