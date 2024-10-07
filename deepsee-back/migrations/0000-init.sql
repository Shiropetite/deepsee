CREATE TABLE "history" (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "job_offer" (
    id SERIAL PRIMARY KEY,
    company_logo VARCHAR(1000) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contract VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL
);
