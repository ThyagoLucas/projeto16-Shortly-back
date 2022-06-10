/* Tables */


CREATE TABLE users (
    
    "user_id" SERIAL PRIMARY KEY UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL

)

CREATE TABLE sessions (

    "id" SERIAL PRIMARY KEY UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "user_id" INT NOT NULL REFERENCES users (user_id),
    "token" TEXT NOT NULL UNIQUE,
    "is_available" BOOLEAN NOT NULL
   
)


CREATE TABLE links(

    "id" SERIAL PRIMARY KEY UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "user_id" INT NOT NULL REFERENCES users (user_id),
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "is_available" BOOLEAN NOT NULL,
    "visitCount" INT NOT NULL
    
)

