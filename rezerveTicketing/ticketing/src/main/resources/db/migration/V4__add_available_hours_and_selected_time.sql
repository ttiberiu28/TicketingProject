-- Add the new 'available_dates' column to the 'movie' table
ALTER TABLE movie
    ADD available_dates VARCHAR(255);

-- Add the new 'available_hours' and 'available_dates' columns to the 'concert' table
ALTER TABLE concert
    ADD available_hours VARCHAR(255),
    ADD available_dates VARCHAR(255);
