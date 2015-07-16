package catequese.online.model;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2015-07-15T13:38:15.896-0400")
@StaticMetamodel(Catequista.class)
public class Catequista_ {
	public static volatile SingularAttribute<Catequista, Integer> id;
	public static volatile SingularAttribute<Catequista, String> nome;
	public static volatile SingularAttribute<Catequista, Date> nascimento;
	public static volatile SingularAttribute<Catequista, String> email;
	public static volatile SingularAttribute<Catequista, String> senha;
	public static volatile SingularAttribute<Catequista, String> situacao;
}
