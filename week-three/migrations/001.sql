CREATE TABLE user
(
    id       int(11)      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name     text         NOT NULL,
    email    varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    role     int(1)       NOT NULL DEFAULT 1
);



CREATE TABLE cat
(
    id        int(11)      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name      varchar(255) NOT NULL,
    weight    float        NOT NULL,
    owner_id  int(11)      NOT NULL,
    file_name varchar(255) NOT NULL,
    birthdate date         NOT NULL,
    CONSTRAINT fk_cat_owner_id FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE CASCADE
);





INSERT INTO user (id, name, email, password, role)
VALUES (1, 'admin', 'admin@metropolia.fi', 'asdf', 0),
       (2, 'Jane Doez', 'jane@metropolia.fi', 'qwer', 1),
       (3, 'John Doe', 'john@metropolia.fi', '1234', 1);

INSERT INTO cat (id, name, weight, owner_id, file_name, birthdate)
VALUES (1, 'Frank', 5, 1, '300.jpeg', '2010-08-04'),
       (2, 'Jessie', 3.5, 2, '302.jpeg', '2020-11-03'),
       (3, 'Garfield', 11, 3, '304.jpeg', '1978-02-12');

