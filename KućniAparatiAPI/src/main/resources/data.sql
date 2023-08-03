

INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (1,'miroslav@maildrop.cc','miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','Miroslav','Simic','ADMIN');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (2,'tamara@maildrop.cc','tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','Tamara','Milosavljevic','KORISNIK');
INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga)
              VALUES (3,'petar@maildrop.cc','petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','Petar','Jovic','KORISNIK');

INSERT INTO aparati (id, naziv, tip, istek_garancije, cena, garantni_rok, 
	kategorija_id, stanje_id) VALUES (1, 'Galaxy S10e, 'smartfon', 2023/02/17, 72000, 2, 3);

INSERT INTO kategorije (id, ime) VALUES (1, 'bela tehnika');
INSERT INTO kategorije (id, ime) VALUES (2, 'mobilni telefon');
INSERT INTO kategorije (id, ime) VALUES (3, 'mali kućni aparat');


INSERT INTO stanje (id, opis) VALUES (1, 'nov');
INSERT INTO stanje (id, opis) VALUES (2, 'u kvaru');
INSERT INTO stanje (id, opis) VALUES (3, 'ispravan');
INSERT INTO stanje (id, opis) VALUES (4, 'na popravci');