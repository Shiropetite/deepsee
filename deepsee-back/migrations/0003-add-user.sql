CREATE TABLE "user" (
    id INTEGER PRIMARY KEY ,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

ALTER TABLE "user" RENAME TO user_info;
ALTER TABLE user_info ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
