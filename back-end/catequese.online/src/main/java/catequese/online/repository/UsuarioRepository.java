package catequese.online.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import catequese.online.model.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Integer>,
	JpaSpecificationExecutor<Usuario> {

}
