# Docker Setup

## Start everything

```bash
docker compose up --build
```

## Services

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8081`
- MySQL: `localhost:3306`

The frontend proxies `/api` requests to the backend container.

## Stop everything

```bash
docker compose down
```

## Reset database volume

```bash
docker compose down -v
```

## Default admin

- Username: `admin`
- Password: `admin123`
