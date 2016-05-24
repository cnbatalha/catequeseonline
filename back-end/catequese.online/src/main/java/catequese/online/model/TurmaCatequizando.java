package catequese.online.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.sistematic.lib.model.ModelInterface;

@Entity
@Table(name = "turma")
public class TurmaCatequizando implements Serializable, ModelInterface<Integer> {

	/**
*  
*/
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private Integer idTurma;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "turma_catequizando", joinColumns = { @JoinColumn(name = "id_turma") }, inverseJoinColumns = { @JoinColumn(name = "id_catequizando") })
	private Set<Catequizando> catequizandos;

	@Transient
	@Column(name = "SITUACAO_DELETADO")
	private String situacao;

	public TurmaCatequizando() {
		this.situacao = "S";
	}
	
	public Integer getIdTurma() {
		return idTurma;
	}

	public void setIdTurma(Integer idTurma) {
		this.idTurma = idTurma;
	}

	public Set<Catequizando> getCatequizandos() {
		return catequizandos;
	}

	public void setCatequizandos(Set<Catequizando> catequizandos) {
		this.catequizandos = catequizandos;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

	@Override
	public Integer getObjectID() {
		return this.idTurma;
	}

}
