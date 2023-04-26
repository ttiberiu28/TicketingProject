-- Update the 'movie' table: update the 'available_hours' column type
ALTER TABLE movie
    ALTER COLUMN available_hours TYPE VARCHAR(255);


