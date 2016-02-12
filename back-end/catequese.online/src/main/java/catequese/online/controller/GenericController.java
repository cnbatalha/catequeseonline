package catequese.online.controller;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class GenericController {

	@PersistenceContext
	private EntityManager em;

	public Object getObject(String className) throws InstantiationException,
			IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, ClassNotFoundException,
			NoSuchMethodException, SecurityException {

		Class<?> clazz = Class.forName(className);
		Constructor<?> ctor = clazz.getConstructor();
		Object object = ctor.newInstance(new Object[] {});

		return object;
	}

	@RequestMapping(value = "/list/{class}")
	public List<Object> listaRegistros(
			@PathVariable(value = "class") String className) {

		Class<?> clazz;

		try {
			clazz = Class.forName(className);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;

		}

		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
		Root employee = criteriaQuery.from(clazz);

		criteriaQuery.select(employee);

		Query query = em.createQuery(criteriaQuery);
		List<Object> result = query.getResultList();

		return result;

	}

}
