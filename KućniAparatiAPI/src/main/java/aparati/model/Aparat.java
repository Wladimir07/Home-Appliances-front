package aparati.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Aparat {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @Column
	 private String naziv;
	 
	 @Column
	 private String tip;
	 
	 @Column
	 private LocalDateTime istekGarancije;
	 
	 @Column
	 private double cena;
	 
	 @Column
	 private String garantniRok;
	 
	 @Column
	 private Kategorija kategorija;
	 
	 @Column
	 private Stanje stanje;
	 
	 
	 
	 

}
