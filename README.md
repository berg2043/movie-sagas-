# Movie List

## Descriptipon
_Durration: 24 hours_

This is a simple single page app that lists movies from a database. If users
click on the image, they can view details about the movie they'll clicked.

## Prerequisites

* Node.js
* postgres

## Installation

1. Run npm install
2. Create a database called `saga_movies_weekend` on your local postgres server. Update
`server\modules\pool.js` as needed for username and password of your postgres server
3. Run the SQL commands found in `database.sql`
3. Run `npm run build` to build a local react app
4. Run `npm run server` to run the server.
5. Go to `localhost:5000` 

## Usage

The main page displays a list of movies.  

Clicking on the image brings the user to that movie.

Clicking edit brings the user to a page where they can change the title, 
description, or genres for that movie.

## Built With

Javascript
* Node.js
* express
* pg
* react
* redux
* material-ui

SQL
* postgres
* pgadmin 4

## Support

This was created as an assignment and is thus unsupported.