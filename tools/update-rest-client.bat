::Go to script dir
cd %~dp0

:: Delete generated sources dir
rmdir /S /Q ..\libs\rest-client\src

:: Generate client
java -jar openapi-generator-cli-3.3.2.jar generate -i http://localhost:8080/v2/api-docs -g typescript-angular -o ..\libs\rest-client\src
