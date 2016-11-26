# rest-markdown

A simple REST API for processing Markdown documents into HTML and storing the
result in a mongodb backend.

## Requirements

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Install docker and docker-compose
2. Clone this repository:

```
$ git clone git@github.com:lnieves/rest-markdown.git
$ cd rest-markdown
$ docker-compose up
```

After `npm install` runs in the container and the application starts, you can reach the
swagger documentation under (http://localhost:10010/api?url=http://localhost:10010/api-docs)

## Enpoints

### /markdown

PUT request with x-www-urlencoded body of the the markdown document in the 
*markdown* parameter. Using [HTTPie](https://httpie.org/) it looks like this:

```
$ http PUT :10010/markdown markdown=@tests/lib/fixtures/ruby-README.md
HTTP/1.1 201 Created
Connection: keep-alive
Date: Sat, 26 Nov 2016 14:54:57 GMT
Transfer-Encoding: chunked
cache-control: no-cache
content-encoding: gzip
content-type: application/json; charset=utf-8
vary: accept-encoding

{
    "url": "localhost:10010/markdown/5839a2419066ef0bd736d5bd"
}
```

Response is a JSON document containing the URL of the successfully stored markdown/HTML
document.

### /markdown/{id}

GET request providing the id of the document to be retrieved:

```
$ http  localhost:10010/markdown/5839a2419066ef0bd736d5bd
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sat, 26 Nov 2016 21:57:34 GMT
Transfer-Encoding: chunked
cache-control: no-cache
content-encoding: gzip
content-type: application/json; charset=utf-8
vary: accept-encoding

{
    "_id": "5839a2419066ef0bd736d5bd", 
    "html": "<html><body><h1>Welcome to Rails</h1>...",
    "source":# Welcome to Rails..."
}

Response is a JSON document containing both the original markdown source and the
converted HTML.

## Tests

$ npm test

