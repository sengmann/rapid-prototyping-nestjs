USE [master];
GO

CREATE LOGIN workshop_prototype WITH PASSWORD = 's4fePassword', CHECK_EXPIRATION = OFF;
GO

CREATE DATABASE workshop_prototype;
GO

USE [workshop_prototype];
GO

CREATE USER workshop_prototype FOR LOGIN workshop_prototype;
GO

EXEC sp_addrolemember 'db_owner', 'workshop_prototype';
GO

/** DDL */
CREATE TABLE [niederlassung]
(
    id   INT IDENTITY PRIMARY KEY,
    gssn varchar(6) NOT NULL,
    name varchar(100)
);

CREATE TABLE [standort]
(
    id               INT IDENTITY PRIMARY KEY,
    niederlassung_id INT FOREIGN KEY REFERENCES [niederlassung] (id),
    autoline_id      varchar(2) NOT NULL,
    name             varchar(100),
);

CREATE TABLE [kfz]
(
    id       INT IDENTITY PRIMARY KEY,
    regno    varchar(10),
    besitzer varchar(100),
);

CREATE TABLE [reperatur_status]
(
    id     INT IDENTITY PRIMARY KEY,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE [reperatur]
(
    id                  INT IDENTITY PRIMARY KEY,
    auftrag             VARCHAR(10),
    standort_id         INT FOREIGN KEY REFERENCES [standort] (id),
    kfz_id              INT FOREIGN KEY REFERENCES [kfz] (id),
    reperatur_status_id INT FOREIGN KEY REFERENCES [reperatur_status] (id),
);

/** Sample data */
INSERT INTO niederlassung
VALUES ('NP01', 'Testverbund Nord'),
       ('NP02', 'Testverbund West'),
       ('NP03', N'Testverbund Süd'),
       ('NP04', 'Testverbund Ost');

INSERT INTO standort
VALUES (1, '10', 'Hamburg City'),
       (1, '11', 'Hamburg Hafen'),
       (2, '10', N'Köln'),
       (2, '11', 'Dortmund'),
       (3, '10', 'Stuttgart'),
       (3, '11', N'München'),
       (4, '10', 'Leipzig'),
       (4, '11', 'Dresden');

INSERT INTO kfz
VALUES ('ES-MM3322', 'Manfred Mustermann'),
       ('HH-HD4478', 'Henriette Daubner'),
       ('S-TR8876', 'Theodor Rosewelt');

INSERT INTO reperatur_status
VALUES ('Termin'),
       ('Annahme'),
       ('Service'),
       ('Werkstatt'),
       (N'Wäsche'),
       ('Abholung'),
       ('Abgeschlossen');

INSERT INTO reperatur
VALUES ('WIP-123456', 1, 1, 1),
       ('WIP-123457', 2, 1, 4),
       ('WIP-123458', 2, 2, 7),
       ('WIP-123459', 3, 1, 7),
       ('WIP-123460', 4, 1, 7),
       ('WIP-123461', 7, 2, 7);
