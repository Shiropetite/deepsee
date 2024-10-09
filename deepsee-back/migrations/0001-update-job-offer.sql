-- Create company table --
CREATE TABLE "company" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(1000) NOT NULL
);

-- Add company_id to job_offer --
ALTER TABLE "job_offer" ADD COLUMN company_id INTEGER REFERENCES company(id);

INSERT INTO "company" (name, logo) SELECT company_name, company_logo FROM "job_offer";
UPDATE "job_offer" SET company_id = job_offer.id;

-- Drop company_name and company_logo from job_offer --
ALTER TABLE "job_offer" DROP COLUMN company_logo;
ALTER TABLE "job_offer" DROP COLUMN company_name;

-- Update type date on job_offer --
ALTER TABLE "job_offer" ADD COLUMN published_at TIMESTAMP;
ALTER TABLE "job_offer" DROP COLUMN date;

-- Update type location on job_offer --
ALTER TABLE "job_offer" ADD COLUMN city VARCHAR(255);
ALTER TABLE "job_offer" DROP COLUMN location;