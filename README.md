# Node microservices usin Kafka

![stack](./images/stack.png)


## Install dependencies

```bash
yarn
```

## Docker componse

```bash
docker-compose build
docker-compose up
```

## Send a message

```bash
curl --request POST \
  --url http://localhost:3000/api/messages \
  --header 'Content-Type: application/json' \
  --data '{
  "sender": "producer",
  "receiver": "consumer",
  "message": "KAFKA!"
}'
```bash
