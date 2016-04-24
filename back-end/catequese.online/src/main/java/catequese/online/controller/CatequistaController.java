package catequese.online.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import catequese.online.model.Catequista;
import catequese.online.repository.CatequistaRepository;

import com.google.common.collect.Lists;

@Controller
@RequestMapping("/catequista")
public class CatequistaController {

	@Autowired
	CatequistaRepository catequistaRepository;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Collection<Catequista> getLista() {

		return Lists.newArrayList(catequistaRepository.findAll());
	}

	// load all register using pagination
	@RequestMapping(value = "/page/{indexPage}/{count}", method = RequestMethod.GET)
	public @ResponseBody Page<Catequista> getListPage(
			@PathVariable("indexPage") Integer indexPage,
			@PathVariable("count") Integer count) {

		Page<Catequista> page = catequistaRepository.findAll(new PageRequest(
				indexPage, count));

		return page;
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

}
