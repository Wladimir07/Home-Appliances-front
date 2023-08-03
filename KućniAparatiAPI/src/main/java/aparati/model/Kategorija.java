package aparati.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Kategorija {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String ime;
	
	@OneToMany(mappedBy = "kategorija", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	List<Aparat> aparati = new ArrayList<>();

	public Kategorija() {
		super();
	}

	public Kategorija(String ime, List<Aparat> aparati) {
		super();
		this.ime = ime;
		this.aparati = aparati;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public List<Aparat> getAparati() {
		return aparati;
	}

	public void setAparati(List<Aparat> aparati) {
		this.aparati = aparati;
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
		Kategorija other = (Kategorija) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Kategorija [id=" + id + ", ime=" + ime + ", aparati=" + aparati + "]";
	}
	
	

}
