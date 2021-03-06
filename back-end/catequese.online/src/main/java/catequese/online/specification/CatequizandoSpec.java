package catequese.online.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import catequese.online.model.Catequizando;

public class CatequizandoSpec {

	public static Sort sortDay;

	// query by like name
	public static Specification<Catequizando> isNameLike(final String nome) {

		return new Specification<Catequizando>() {

			@Override
			public Predicate toPredicate(Root<Catequizando> root,
					CriteriaQuery<?> arg1, CriteriaBuilder builder) {

				return builder.like(root.<String> get("nome"), nome);
			}
		};

	}

	// query by active register,using field situacao
	public static Specification<Catequizando> isAtivo() {

		return new Specification<Catequizando>() {

			@Override
			public Predicate toPredicate(Root<Catequizando> root,
					CriteriaQuery<?> arg1, CriteriaBuilder builder) {

				return builder.like(root.<String> get("situacao"), "N");
			}
		};

	}

	// query by birthday
	public static Specification<Catequizando> isAniversario(final Integer mes) {

		return new Specification<Catequizando>() {

			@Override
			public Predicate toPredicate(Root<Catequizando> root,
					CriteriaQuery<?> query, CriteriaBuilder builder) {

				Path<Date> birthdate = root.get("nascimento");
				Expression<Integer> mesAniversario = builder.function("month",
						Integer.class, birthdate);

				Expression<Integer> dayExpression = builder.function("day",
						Integer.class, birthdate);

				// Expression<Object> qry = builder.selectCase(mesAniversario)
				// .otherwise(builder.isNotNull(birthdate));

				// CriteriaQuery<Object> cb = builder.createQuery().get;

				// query.where(builder.equal(mesAniversario, mes)).orderBy(
				// builder.asc(dayExpression));

				return builder.and(builder.equal(mesAniversario, mes),
						builder.isNotNull(birthdate));

			}

		};

	}

	public static Specification<Catequizando> groupByTurma(final Integer mes) {

		return new Specification<Catequizando>() {

			@Override
			public Predicate toPredicate(Root<Catequizando> from,
					CriteriaQuery<?> qry, CriteriaBuilder builder) {	
			
				
				/*CriteriaQuery<Object> qryGb = builder.createQuery();
				
				qryGb.multiselect(qry.getSelection());
				qryGb.groupBy(arg0)
				
				Expression minExpression = builder.min(from.get("pint"));
				Path pbytePath = from.get("pbyte");

				CriteriaQuery<Object> select = qry.multiselect(minExpression,
						pbytePath);

				CriteriaQuery<Object> groupBy = select.groupBy(pbytePath);

				// TypedQuery<Object> typedQuery = entityManager
				// .createQuery(select);
				// List listActual = typedQuery.getResultList(); */

				return null;
			}
		};
	}

	/*
	 * Query query = entityManager.createQuery(
	 * "select min(s.pint),s.pbyte from SimpleBean s group by s.pbyte");
	 * 
	 * List listExpected = query.getResultList();
	 * 
	 * CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	 * CriteriaQuery<Object> criteriaQuery = criteriaBuilder.createQuery(); Root
	 * from = criteriaQuery.from(SimpleBean.class);
	 * 
	 * Expression minExpression = criteriaBuilder.min(from.get("pint")); Path
	 * pbytePath = from.get("pbyte"); CriteriaQuery<Object> select =
	 * criteriaQuery.multiselect(minExpression, pbytePath);
	 * 
	 * CriteriaQuery<Object> groupBy = select.groupBy(pbytePath);
	 * 
	 * TypedQuery<Object> typedQuery = entityManager.createQuery(select); List
	 * listActual = typedQuery.getResultList();
	 */

	public Sort sortByNomeAsc() {

		return new Sort(Sort.Direction.ASC, "nome");
	}

}
