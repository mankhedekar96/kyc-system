
# KYC System Monorepo

This project implements a Know Your Customer (KYC) system with a client-server architecture.

## Structure

- `client`: Frontend (React with Vite)
- `server`: Backend (Node.js with Express)

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Run the client**:
   ```bash
   yarn start:client
   ```

3. **Run the migrations**:
Make sure MySQL Server is running locally. After that run migrations.
   ```bash
   yarn workspace server migrate:up
   ```
To down the migrations you can use following command.
   ```bash
   yarn workspace server migrate:down
   ```

4. **Run the server**:
   ```bash
   yarn start:server
   ```

5. **Run tests**:
   ```bash
   yarn test
   ```

## Workspaces

This project uses Yarn workspaces for managing dependencies across the monorepo.

## License

MIT
