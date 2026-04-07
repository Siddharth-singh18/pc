# Editorials Backend

This backend serves the React frontend in `website/` with:

- member login
- current-user auth check
- public contests list
- contest editorial detail
- member dashboard editorial queue

## Setup

1. Install PostgreSQL locally.
2. Create a database named `editorials_db`.
3. Copy `.env.example` to `.env` and update the values.
4. Install packages:

```bash
npm install
```

5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Run the first migration:

```bash
npm run prisma:migrate -- --name init
```

7. Seed sample data:

```bash
npm run prisma:seed
```

8. Start the server:

```bash
npm run dev
```

## Default Seed Login

- Email: `member@club.com`
- Password: `secret123`

## Expected Frontend APIs

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/contests`
- `GET /api/contests/:slug/editorials`
- `GET /api/editorials/mine`
