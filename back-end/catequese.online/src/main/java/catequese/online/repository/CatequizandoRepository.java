package catequese.online.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import catequese.online.model.Catequizando;

public interface CatequizandoRepository extends
		PagingAndSortingRepository<Catequizando, Integer>,
		JpaSpecificationExecutor<Catequizando> {

	public Collection<Catequizando> findByIdTurmaAtual(Integer idTurma,
			Sort sort);

	public Collection<Catequizando> findBySituacao(String situacao, Sort sort);
	
	//@Query("select u.idTurmaAtual from catequizando u group by u.idTurmaAtual")
	//public List<String> findGruped();
}
