package catequese.online.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.sistematic.lib.model.StatusRetorno;
import br.sistematic.lib.query.FieldLikeString;
import br.sistematic.lib.web.HelperController;
import br.sistematic.lib.web.HelperQuery;
import br.sistematic.lib.web.RepositoryInterface;
import catequese.online.model.Catequista;
import catequese.online.repository.CatequistaRepository;

import com.google.common.collect.Lists;

@Controller
@RequestMapping("/catequista")
public class CatequistaController extends HelperController<Catequista, Integer> {

	@Autowired
	CatequistaRepository catequistaRepository;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Collection<Catequista> getLista() {

		return Lists.newArrayList(catequistaRepository.findAll());
	}

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody StatusRetorno save(HttpServletResponse response,
			Catequista catequista) {

		return super.save(response, catequista);
	}

	// load all register using pagination
	@RequestMapping(value = "/page/{acesso}/{indexPage}/{count}", method = RequestMethod.GET)
	public @ResponseBody Page<Catequista> getListPage(
			HttpServletResponse response,
			@PathVariable("acesso") Integer acesso,
			@PathVariable("indexPage") Integer indexPage,
			@PathVariable("count") Integer count) {

		Page<Catequista> page = catequistaRepository.findAll(new PageRequest(
				indexPage, count));

		return page;
	}

	@RequestMapping(value = "/page/{acesso}/{indexPage}/{count}", method = RequestMethod.POST)
	public @ResponseBody Page<Catequista> getListPage(
			HttpServletResponse response,
			@PathVariable("acesso") Integer acesso,
			@PathVariable("indexPage") Integer indexPage,
			@PathVariable("count") Integer count,
			@RequestBody List<FieldLikeString> fields) throws IOException {

		List<Specification<Catequista>> loFiltro = new ArrayList<Specification<Catequista>>();
		
		// setando filtro
		for (FieldLikeString field : fields) {
			List<Specification<Catequista>> filtros = new ArrayList<Specification<Catequista>>();

			for (Object value : field.getValues()) {
				filtros.add(instanceQuery().equalField(field.getField(), value));
			}

			loFiltro.add(instanceQuery().orSpecifications(filtros));
		}

		return super.getListPage(response, indexPage, count, loFiltro, "nome");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public boolean login(@RequestBody String hashLogin) {

		return true;
	}

	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	public @ResponseBody String getTeste() {

		return "it's work!";
	}

	@Override
	protected RepositoryInterface<Catequista, Integer> getRepository() {
		return catequistaRepository;
	}

	@Override
	protected HelperQuery<Catequista> instanceQuery() {
		return new HelperQuery<Catequista>() {

			@Override
			protected String getFieldAtivo() {
				return "situacao";
			}

		};
	}

	@Override
	protected Catequista getNewObject() {
		return new Catequista();
	}

	@Override
	protected void setDeleteStatus(Catequista objeto) {
		objeto.setSituacao("N");
	}

}
