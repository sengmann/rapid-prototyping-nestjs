/** DDL */
CREATE TABLE verbund
(
    id   SERIAL PRIMARY KEY,
    kuerzel varchar(6) NOT NULL,
    name varchar(100)
);

CREATE TABLE betrieb
(
    id               SERIAL PRIMARY KEY,
    niederlassung_id INT REFERENCES verbund (id),
    autoline_id      varchar(2) NOT NULL,
    name             varchar(100)
);

CREATE TABLE kfz
(
    id       SERIAL PRIMARY KEY,
    regno    varchar(10),
    besitzer varchar(100)
);

CREATE TABLE reperatur_status
(
    id     SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE reperatur
(
    id                  SERIAL PRIMARY KEY,
    auftrag             VARCHAR(10),
    standort_id         INT REFERENCES betrieb (id),
    kfz_id              INT REFERENCES kfz (id),
    reperatur_status_id INT REFERENCES reperatur_status (id)
);

/** Sample data */
INSERT INTO verbund(kuerzel, name)
VALUES ('N', 'Testverbund Nord'),
       ('W', 'Testverbund West'),
       ('S', N'Testverbund Süd'),
       ('E', 'Testverbund Ost');

INSERT INTO betrieb(niederlassung_id, autoline_id, name)
VALUES (1, '10', 'Hamburg City'),
       (1, '11', 'Hamburg Hafen'),
       (2, '10', N'Köln'),
       (2, '11', 'Dortmund'),
       (3, '10', 'Stuttgart'),
       (3, '11', N'München'),
       (4, '10', 'Leipzig'),
       (4, '11', 'Dresden');

INSERT INTO kfz(regno, besitzer)
VALUES ('ES-MM3322', 'Manfred Mustermann'),
       ('HH-HD4478', 'Henriette Daubner'),
       ('S-TR8876', 'Theodor Rosewelt');

INSERT INTO reperatur_status(status)
VALUES ('Termin'),
       ('Annahme'),
       ('Service'),
       ('Werkstatt'),
       ('Abholung'),
       ('Abgeschlossen');

INSERT INTO reperatur(auftrag, standort_id, kfz_id, reperatur_status_id)
VALUES ('WIP-123456', 1, 1, 1),
       ('WIP-123457', 2, 1, 4),
       ('WIP-123458', 2, 2, 6),
       ('WIP-123459', 3, 1, 6),
       ('WIP-123460', 4, 1, 6),
       ('WIP-123461', 7, 2, 6);
