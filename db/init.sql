CREATE DATABASE [car-db];
GO

USE [car-db];
GO

CREATE TABLE Cars (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Make NVARCHAR(50),               
    Model NVARCHAR(50),              
    Year INT,                        
    Price DECIMAL(10, 2)             
);
GO

-- Insert 5 sample records into the 'Cars' table
INSERT INTO Cars (Make, Model, Year, Price)
VALUES 
    ('Toyota', 'Corolla', 2020, 20000.50),
    ('Ford', 'Mustang', 2021, 35000.75),
    ('Honda', 'Civic', 2019, 22000.00),
    ('Tesla', 'Model 3', 2022, 45000.99),
    ('Chevrolet', 'Malibu', 2018, 18000.25);
GO

CREATE PROCEDURE getAllCars
AS
BEGIN
    SELECT * 
    FROM Cars
END;
GO

CREATE PROCEDURE upsertCar
    @ID INT = NULL,                     
    @Make NVARCHAR(50) = NULL,          
    @Model NVARCHAR(50) = NULL,         
    @Year INT = NULL,                   
    @Price DECIMAL(10, 2) = NULL        
AS
BEGIN
    -- Check if the car exists
    IF EXISTS (SELECT 1 FROM Cars WHERE ID = @ID)
    BEGIN
        -- Update existing car; only update non-NULL fields
        UPDATE Cars
        SET 
            Make = COALESCE(@Make, Make),
            Model = COALESCE(@Model, Model),
            Year = COALESCE(@Year, Year),
            Price = COALESCE(@Price, Price)
        WHERE ID = @ID;
    END
    ELSE
    BEGIN
        -- Insert new car, setting default values for missing fields
        INSERT INTO Cars (Make, Model, Year, Price)
        VALUES (
            COALESCE(@Make, ''),   
            COALESCE(@Model, ''), 
            COALESCE(@Year, NULL),            
            COALESCE(@Price, NULL)            
        );
    END
END;
GO
