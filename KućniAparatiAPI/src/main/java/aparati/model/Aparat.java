package aparati.model;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Aparat {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @Column
	 private String naziv;
	 
	 @Column
	 private String tip;
	 
	 @Column (name="istek_garancije")
	 private LocalDate istekGarancije;
	 
	 @Column
	 private double cena;
	 
	 @Column (name="garantni_rok")
	 private String garantniRok;
	 
	 @ManyToOne
	 private Kategorija kategorija;
	 
	 @ManyToOne
	 private Stanje stanje;

	public Aparat() {
		super();
	}

	public Aparat(String naziv, String tip, LocalDate istekGarancije, double cena, String garantniRok,
			Kategorija kategorija, Stanje stanje) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.istekGarancije = istekGarancije;
		this.cena = cena;
		this.garantniRok = garantniRok;
		this.kategorija = kategorija;
		this.stanje = stanje;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public LocalDate getIstekGarancije() {
		return istekGarancije;
	}

	public void setIstekGarancije(LocalDate istekGarancije) {
		this.istekGarancije = istekGarancije;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getGarantniRok() {
		return garantniRok;
	}

	public void setGarantniRok(String garantniRok) {
		this.garantniRok = garantniRok;
	}

	public Kategorija getKategorija() {
		return kategorija;
	}

	public void setKategorija(Kategorija kategorija) {
		this.kategorija = kategorija;
	}

	public Stanje getStanje() {
		return stanje;
	}

	public void setStanje(Stanje stanje) {
		this.stanje = stanje;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Aparat other = (Aparat) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Aparat [naziv=" + naziv + ", tip=" + tip + ", istekGarancije=" + istekGarancije
				+ ", cena=" + cena + ", garantniRok=" + garantniRok + ", kategorija=" + kategorija + ", stanje="
				+ stanje + "]";
	}
	 
	 
	 
	 

}
