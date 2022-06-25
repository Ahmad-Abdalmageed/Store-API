#!/usr/bin/env bash
echo "*******__ Store Server API  __*******"

echo "*******__ 1.Create a repository with the eb init command.....👨🏻‍💻🤌🏻  __*******"
eb init store-api --platform node.js-16 --region us-east-1

echo "*******__ 2.Sets the specified environment....👨🏻‍💻🤌🏻  __*******"
eb use store-api-dev

# shellcheck disable=SC2086
eb setenv RDS_HOSTNAME_TEST="$RDS_HOSTNAME_TEST" RDS_HOSTNAME="$RDS_HOSTNAME" RDS_PORT="$RDS_PORT" RDS_DB_NAME="$RDS_DB_NAME" RDS_DB_NAME_TEST="$RDS_DB_NAME_TEST" RDS_USERNAME="$RDS_USERNAME" RDS_PASSWORD="$RDS_PASSWORD" ENV="$ENV" BCRYPT_PASSWORD="$BCRYPT_PASSWORD" SALT_ROUNDS="$SALT_ROUNDS" TOKEN_SECRET=$TOKEN_SECRET
echo "*******__ 3.Deploy the changes....👨🏻‍💻🤌🏻  __*******"
eb deploy store-api-dev --staged