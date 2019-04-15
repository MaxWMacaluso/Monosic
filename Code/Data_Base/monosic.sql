SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET default_tablespace = '';
SET default_with_oids = false;


DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id smallint NOT NULL,
    last_name character varying(20),
    first_name character varying(10),
	user_name character varying(20) NOT NULL,
	password character varying(20) NOT NULL,
	apple_id character varying(20),
	apple_pass character varying(20),
	spotify_id character varying(20),
	spotify_pass character varying(20),
	cloud_id character varying(20),
	cloud_pass character varying(20),
	primary key (user_id)
);

INSERT INTO users VALUES (1, Null, Null, 'admin', 'admin', Null, Null, Null, Null, Null, Null);