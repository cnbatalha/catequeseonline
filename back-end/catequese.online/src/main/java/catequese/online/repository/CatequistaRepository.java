package catequese.online.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import catequese.online.model.Catequista;

public interface CatequistaRepository extends PagingAndSortingRepository<Catequista, Integer>,
	JpaSpecificationExecutor<Catequista> {

}
