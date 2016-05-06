package catequese.online.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.sistematic.lib.model.ModelInterface;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "catequista")
public class Catequista implements Serializable, ModelInterface<Integer>  {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nome;
    private Date nascimento;
    private String email;
    private String senha;

    @JsonIgnore
    @Column(name = "situacao_deletado")
    private String situacao = "N";

    public Integer getId() {
	return id;
    }

    public void setId(Integer id) {
	this.id = id;
    }

    public String getNome() {
	return nome;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public Date getNascimento() {
	return nascimento;
    }

    public void setNascimento(Date nascimento) {
	this.nascimento = nascimento;
    }

    public String getSituacao() {
	return situacao;
    }

    public void setSituacao(String situacao) {
	this.situacao = situacao;
    }

    public String getSenha() {
	return senha;
    }

    public void setSenha(String senha) {
	this.senha = senha;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

	@Override
	public Integer getObjectID() {
		return this.id;
	}

}
