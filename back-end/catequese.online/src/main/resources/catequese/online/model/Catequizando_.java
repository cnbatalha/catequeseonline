package catequese.online.model;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2015-07-15T13:38:16.335-0400")
@StaticMetamodel(Catequizando.class)
public class Catequizando_ {
	public static volatile SingularAttribute<Catequizando, Integer> id;
	public static volatile SingularAttribute<Catequizando, String> nome;
	public static volatile SingularAttribute<Catequizando, Date> nascimento;
	public static volatile SingularAttribute<Catequizando, String> nomePai;
	public static volatile SingularAttribute<Catequizando, String> nomeMae;
	public static volatile SingularAttribute<Catequizando, Boolean> batizado;
	public static volatile SingularAttribute<Catequizando, Boolean> eucaristia;
	public static volatile SingularAttribute<Catequizando, String> escola;
	public static volatile SingularAttribute<Catequizando, String> serieEscola;
	public static volatile SingularAttribute<Catequizando, String> sexo;
	public static volatile SingularAttribute<Catequizando, String> endereco;
	public static volatile SingularAttribute<Catequizando, String> observacao;
	public static volatile SingularAttribute<Catequizando, String> telCelular;
	public static volatile SingularAttribute<Catequizando, String> telFixo;
	public static volatile SingularAttribute<Catequizando, Integer> idTurmaAtual;
	public static volatile SingularAttribute<Catequizando, String> situacao;
}
