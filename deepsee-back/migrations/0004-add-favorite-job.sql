CREATE TABLE favorite_job (
    user_id INTEGER NOT NULL REFERENCES "user_info"(id),
    job_id INTEGER NOT NULL REFERENCES "job_offer"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id)
);
