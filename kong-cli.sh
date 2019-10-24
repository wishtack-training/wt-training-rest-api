read url
read key

#
# Services
#

function addService() {
  echo service name?
  read service
  echo service url?
  read serviceUrl
  curl -X POST \
    -H "apikey: $key" \
    --url "$url/services" \
    --data "name=$service" \
    --data "url=$serviceUrl" | jq
}

function getServices() {
  curl \
    -H "apikey: $key" \
    --url "$url/services" | jq
}

function deleteService() {
  echo which service?
  read service
  curl -i -X DELETE \
    -H "apikey: $key" \
    --url "$url/services/$service" 
}


#
# Routes
#

function addRoute() {

  echo which service?
  read service

  echo which path?
  read path

  echo name?
  read name

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/services/$service/routes" \
    --data "name=$name" \
    --data "paths[]=$path" | jq
  
}

function getRoutes() {

  echo which service?
  read service
  
  curl \
    -H "apikey: $key" \
    --url "$url/services/$service/routes" | jq

}

function deleteRoute() {

  echo which route?
  read route

  curl -X DELETE \
    -H "apikey: $key" \
    --url "$url/routes/$route" | jq

}

#
# Consumers
#

function addConsumer() {

  echo consumer name?
  read consumer

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/consumers" \
    --data "username=$consumer" | jq

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/consumers/$consumer/acls" \
    --data "group=$consumer" | jq

}

function getConsumers() {

  curl \
    -H "apikey: $key" \
    --url "$url/consumers" | jq

}

function deleteConsumer() {

  echo consumer name?
  read consumer

  curl -X DELETE \
    -H "apikey: $key" \
    --url "$url/consumers/$consumer" | jq
}

function addCredentials() {

  echo consumer name?
  read consumer

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/consumers/$consumer/key-auth" | jq

}

#
# Plugins
#

function getPlugins() {

  echo which route?
  read route

  curl \
    -H "apikey: $key" \
    --url "$url/routes/$route/plugins" | jq

}

function deletePlugin() {

  echo which plugin?
  read plugin

  curl -X DELETE \
    -H "apikey: $key" \
    --url "$url/plugins/$plugin" | jq
    
}

#
# Auth
# 
function addPluginAuth() {

  echo which route?
  read route
  
  curl -X POST \
    -H "apikey: $key" \
    --url "$url/routes/$route/plugins" \
    --data "name=key-auth" | jq

}

#
# Rate limit
#

function addPluginRateLimiting() {

  echo which route?
  read route

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/routes/$route/plugins" \
    --data "name=rate-limiting" \
    --data "config.minute=5" \
    --data "config.policy=local" | jq

}


#
# ACL Plugin
#

function addPluginAcl() {

  echo which route?
  read route

  echo "which consumers (e.g.: consumer1,consumer2)?"
  read consumers

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/routes/$route/plugins" \
    --data "name=acl" \
    --data "config.whitelist=$consumers" | jq

}

function addPluginTcpLog() {

  echo which route?
  read route

  echo which host?
  read host

  echo which port?
  read port

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/plugins" \
    --data "name=syslog" | jq

  curl -X POST \
    -H "apikey: $key" \
    --url "$url/plugins" \
    --data "name=tcp-log"  \
    --data "config.host=$host" \
    --data "config.port=$port" | jq

}