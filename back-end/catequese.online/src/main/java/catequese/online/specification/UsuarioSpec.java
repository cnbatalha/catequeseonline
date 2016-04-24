package catequese.online.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import catequese.online.model.Usuario;

public class UsuarioSpec {

    public static Specification<Usuario> login(final String login, final String passwd) {

	return new Specification<Usuario>() {

	    @Override
	    public Predicate toPredicate(Root<Usuario> root, CriteriaQuery<?> arg1, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		return builder.and(builder.equal(root.<String> get("email"), login),
			builder.equal(root.<String> get("senha"), passwd));
	    }
	};

    }
    
}
