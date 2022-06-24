#!/usr/bin/env bash
echo "*******__ Store Server API  __*******"

echo "*******__ 1.Create a repository with the eb init command.....👨🏻‍💻🤌🏻  __*******"
eb init store-api --platform node.js-16 --region us-east-1

echo "*******__ 2.Sets the specified environment....👨🏻‍💻🤌🏻  __*******"
eb use store-api-dev

echo "*******__ 3.Deploy the changes....👨🏻‍💻🤌🏻  __*******"
eb deploy store-api-dev