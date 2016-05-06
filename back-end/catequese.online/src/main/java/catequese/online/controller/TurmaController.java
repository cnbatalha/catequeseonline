package catequese.online.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.sistematic.lib.model.StatusRetorno;
import catequese.online.model.Catequizando;
import catequese.online.model.Turma;
import catequese.online.model.TurmaCatequizando;
import catequese.online.repository.CatequizandoRepository;
import catequese.online.repository.TurmaCatequizandoRepository;
import catequese.online.repository.TurmaRepository;

import com.google.common.collect.Lists;

@Controller
@RequestMapping("/turma")
@Secured("ROLE_ADMIN")
public class TurmaController {

	@Autowired
	TurmaRepository turmaRepository;

	@Autowired
	TurmaCatequizandoRepository turmaCatequizandoRepo;
	
	@Autowired
	CatequizandoRepository catequizandoRepository;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody Collection<Turma> getList() {
		return Lists.newArrayList(turmaRepository.findAll());
	}

	@RequestMapping(value = "/{idTurma}", method = RequestMethod.GET)
	public @ResponseBody Turma getTurma(@PathVariable Integer idTurma) {
		return turmaRepository.findOne(idTurma);
	}

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody Turma saveTurma(@RequestBody Turma turma) {
		
		return turmaRepository.save(turma);
	}

	@RequestMapping(value = "/{idTurma}/listcatequizando", method = RequestMethod.GET)
	@ResponseBody
	public TurmaCatequizando getCatequizandosTurma(
			@PathVariable("idTurma") Integer idTurma) {
				
		return turmaCatequizandoRepo.findOne(idTurma);

	}
	
	@RequestMapping(value = "{idTurma}/catequizando/add", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public StatusRetorno addParticipante(
			@PathVariable("idTurma") Integer idTurma,
			@RequestBody List<Integer> catequizandos) {

		StatusRetorno statusRetorno = new StatusRetorno();

		for (Integer p : catequizandos) {

			Catequizando catequizado = catequizandoRepository.findOne(p);

			if (catequizado != null) {
				try {

					TurmaCatequizando turmaCatequizando = turmaCatequizandoRepo
							.findOne(idTurma);
					turmaCatequizando.getCatequizandos().add(catequizado);

					turmaCatequizandoRepo.save(turmaCatequizando);

					statusRetorno.setStatus(1);
				} catch (Exception e) {
					statusRetorno.setStatus(0);
					statusRetorno.setMsg(e.getMessage());
				}

			} else {
				statusRetorno.setStatus(0);
				statusRetorno.setMsg("Catequizando nao localizado");
			}

		}

		return statusRetorno;
	}

	@RequestMapping(value = "{idTurma}/catequizando/delete", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public StatusRetorno deleteparticipante(
			@PathVariable("idTurma") Integer idTurma,
			@RequestBody List<Integer> catequizandos) {

		StatusRetorno statusRetorno = new StatusRetorno();

		for (Integer p : catequizandos) {

			Catequizando catequizado = catequizandoRepository.findOne(p);

			if (catequizado != null) {
				try {

					TurmaCatequizando turmaCatequizando = turmaCatequizandoRepo
							.findOne(idTurma);
					Iterator<Catequizando> catequiandosLista = turmaCatequizando
							.getCatequizandos().iterator();

					boolean finded = false;
					while (catequiandosLista.hasNext() && !finded) {
						if (catequiandosLista.next().getId() == p) {
							catequiandosLista.remove();
							finded = true;
						}
					}

					if (finded) {
						turmaCatequizandoRepo.save(turmaCatequizando);
					}

					statusRetorno.setStatus(1);
				} catch (Exception e) {
					statusRetorno.setStatus(0);
					statusRetorno.setMsg(e.getMessage());
				}

			} else {
				statusRetorno.setStatus(0);
				statusRetorno.setMsg("Catequizando nao localizado");
			}

		}

		return statusRetorno;
	}


}
