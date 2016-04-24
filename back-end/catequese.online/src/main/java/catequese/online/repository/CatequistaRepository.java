package catequese.online.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import catequese.online.model.Catequista;

public interface CatequistaRepository extends
		PagingAndSortingRepository<Catequista, Integer>,
		JpaSpecificationExecutor<Catequista> {

}
