#!/usr/bin/env bash
echo "*******__ Store Server API  __*******"
eb list
eb use store-api-dev
eb printenv
echo "*******__ 3.Deploy the changes....👨🏻‍💻🤌🏻  __*******"
eb deploy store-api-dev