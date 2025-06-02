# Home Library Service

A NestJS-based service for managing a home music library, including users, artists, albums, tracks, and favorites.

## Features

- User management (CRUD operations)
- Artist management (CRUD operations)
- Album management (CRUD operations)
- Track management (CRUD operations)
- Favorites management (add/remove favorites, get user's favorites)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd home-library-service
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=home_library
```

4. Create the database:

```bash
createdb home_library
```

5. Run migrations:

```bash
npm run migration:run
```

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

## API Documentation

The API documentation is available at `http://localhost:4000/api` when the application is running.

### Example Requests

#### Users

```bash
# Create user
POST http://localhost:4000/users
{
  "login": "john_doe",
  "password": "password123"
}

# Get all users
GET http://localhost:4000/users

# Get user by id
GET http://localhost:4000/users/1

# Update user
PATCH http://localhost:4000/users/1
{
  "password": "newpassword123"
}

# Delete user
DELETE http://localhost:4000/users/1
```

#### Artists

```bash
# Create artist
POST http://localhost:4000/artists
{
  "name": "The Beatles"
}

# Get all artists
GET http://localhost:4000/artists

# Get artist by id
GET http://localhost:4000/artists/1

# Update artist
PATCH http://localhost:4000/artists/1
{
  "name": "The Beatles (Updated)"
}

# Delete artist
DELETE http://localhost:4000/artists/1
```

#### Albums

```bash
# Create album
POST http://localhost:4000/albums
{
  "name": "Abbey Road",
  "year": 1969,
  "artistId": 1
}

# Get all albums
GET http://localhost:4000/albums

# Get album by id
GET http://localhost:4000/albums/1

# Update album
PATCH http://localhost:4000/albums/1
{
  "name": "Abbey Road (Remastered)",
  "year": 2019
}

# Delete album
DELETE http://localhost:4000/albums/1
```

#### Tracks

```bash
# Create track
POST http://localhost:4000/tracks
{
  "name": "Come Together",
  "duration": 259,
  "artistId": 1,
  "albumId": 1
}

# Get all tracks
GET http://localhost:4000/tracks

# Get track by id
GET http://localhost:4000/tracks/1

# Update track
PATCH http://localhost:4000/tracks/1
{
  "name": "Come Together (Remastered)",
  "duration": 260
}

# Delete track
DELETE http://localhost:4000/tracks/1
```

#### Favorites

```bash
# Add track to favorites
POST http://localhost:4000/favs/track/1

# Add album to favorites
POST http://localhost:4000/favs/album/1

# Add artist to favorites
POST http://localhost:4000/favs/artist/1

# Get all favorites
GET http://localhost:4000/favs

# Remove track from favorites
DELETE http://localhost:4000/favs/track/1

# Remove album from favorites
DELETE http://localhost:4000/favs/album/1

# Remove artist from favorites
DELETE http://localhost:4000/favs/artist/1
```

## Testing

Run the test suite:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

## License

This project is licensed under the MIT License.
