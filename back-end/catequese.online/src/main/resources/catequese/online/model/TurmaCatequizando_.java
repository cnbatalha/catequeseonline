package catequese.online.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-03-12T11:22:51.825-0400")
@StaticMetamodel(TurmaCatequizando.class)
public class TurmaCatequizando_ {
	public static volatile SingularAttribute<TurmaCatequizando, String> situacao;
	public static volatile SingularAttribute<TurmaCatequizando, Integer> idTurma;
	public static volatile SetAttribute<TurmaCatequizando, Catequizando> catequizandos;
}
