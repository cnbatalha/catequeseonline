package catequese.online.specification;

import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import catequese.online.model.Catequizando;

public class TupleQuery {

	// query by like name
	public static Specification<Tuple> isNameLike(final String nome) {

		return new Specification<Tuple>() {

			@Override
			public Predicate toPredicate(Root<Tuple> from,
					CriteriaQuery<?> query, CriteriaBuilder builder) {

				CriteriaQuery<Tuple> cq = builder.createTupleQuery();
				// write the Root, Path elements as usual
				Root<Catequizando> root = cq.from(Catequizando.class);
			
				cq.multiselect(root.get("idTurmaAtual"));

				//builder.
				// TODO Auto-generated method stub
				return null;
			}
		};

	}

}
