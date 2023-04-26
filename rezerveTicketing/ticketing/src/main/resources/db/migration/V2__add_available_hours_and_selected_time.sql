-- Add the new 'available_hours' column to the 'movie' table
ALTER TABLE movie
    ADD available_hours VARCHAR(255);

-- Add the new 'selected_time' column to the 'ticket' table
ALTER TABLE ticket
    ADD selected_time VARCHAR(255);

