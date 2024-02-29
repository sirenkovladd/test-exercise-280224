# glia-exercise

## Setup

1. Install [Node.js (>=18)](https://nodejs.org/en/download/)
2. Install dependencies
```bash
npm install
```

## Run

```bash
npm start
```

## Test

```bash
npm test
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Endpoints

### GET /activity

```bash
curl -X GET http://localhost:3000/activity
```

### POST /user

```bash
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name": "John", "accessibility": "High", "price": "Free"}'
```
