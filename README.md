## Search Functionality with Meilisearch, Prisma and Express

This is a simple example of how to implement search functionality with Meilisearch, Prisma and Express.

Ensure you have the following dependencies installed:
### Meilisearch
To install it, run the following command:

```bash
# Install Meilisearch
curl -L https://install.meilisearch.com | sh

# Launch Meilisearch
./meilisearch

```
### Sqlite3
To install it, run the following command:

```bash
sudo apt-get install sqlite3
```

To get started, clone the repository and install the dependencies:

```bash
yarn install
```

Then, create a `.env` file and add the following environment variables:

```dotenv
DATABASE_URL="file:../db/database.db"
```

Next, run the following commands to create the database and seed it with some data:

```bash
curl 'http://localhost:1337/products' \
  -H 'Content-Type: application/json' \
  -d @db/data.json
```

Finally, run the following command to start the server:

```bash

yarn start
```