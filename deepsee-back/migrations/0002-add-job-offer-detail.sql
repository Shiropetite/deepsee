ALTER TABLE "job_offer"
ADD COLUMN job_description TEXT,
ADD COLUMN day_of_remote_work INTEGER,
ADD COLUMN expectation_description TEXT,
ADD max_diploma VARCHAR(255),
ADD COLUMN experience_min_in_year INTEGER,
ADD COLUMN salary_min_by_year INTEGER,
ADD COLUMN salary_max_by_year INTEGER;

ALTER TABLE "job_offer" DROP COLUMN salary;

CREATE TABLE "job_hard_skill" (
    job_offer_id INTEGER REFERENCES job_offer(id),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "job_soft_skill" (
    job_offer_id INTEGER REFERENCES job_offer(id),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "job_recruitment_step" (
    job_offer_id INTEGER REFERENCES job_offer(id),
    name TEXT NOT NULL,
    time_in_minute INTEGER NOT NULL
);

CREATE TABLE "job_team_member" (
    job_offer_id INTEGER REFERENCES job_offer(id),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

ALTER TABLE "company" 
ADD COLUMN description TEXT,
ADD COLUMN number_of_employee INTEGER,
ADD COLUMN sector VARCHAR(255);

CREATE TABLE "company_avantage" (
    company_id INTEGER REFERENCES company(id),
    name VARCHAR(255) NOT NULL
);

alter table company drop column logo;
