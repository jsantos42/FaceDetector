# Face Detector 

![screenshot](sample.gif)

Fullstack project, with API endpoints, login access and a PostgreSQL database.
- It allows the user to Sign In (or register him/herself if it's a new user) 
- The user can then paste a link to an image with a human face on it
- That link will be sent in an AJAX request to the Clarify API, which will reply
with the location of the faces
- A square will be drawn around the faces, and the entry count of the user will
increment

### How to run:
You need to create the databases (PostgreSQL):

```
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0 NOT NULL,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login(
    id SERIAL PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hash  VARCHAR(100) NOT NULL
);
```

Then you can go to both the frontend and backend folders and run: \
`npm install` \
`npm start:dev`
