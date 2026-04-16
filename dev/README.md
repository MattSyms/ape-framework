# Ape Framework Development Stack

Development stack for [Ape Framework](https://github.com/MattSyms/ape-framework) using [Docker Compose](https://docs.docker.com/compose).

| Service | Docker URL  | Local URL                               |
| ------- | ----------- | --------------------------------------- |
| Node.js | `node:3000` | [localhost:3000](http://localhost:3000) |

## Stack Management

Deploy stack:

```
docker compose up -d
```

## Development

Get a Node.js container shell:

```
docker compose exec node bash
```

## TODO

- Remove Redis
