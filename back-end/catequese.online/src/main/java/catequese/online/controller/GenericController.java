package catequese.online.controller;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/app")
public class GenericController {

	@PersistenceContext
	private EntityManager em;

	@ResponseBody
	@RequestMapping(value = "/objeto/{class}")
	public Object getObject(@PathVariable("class") String className) throws InstantiationException,
			IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, ClassNotFoundException,
			NoSuchMethodException, SecurityException {

		Class<?> clazz = Class.forName("catequese.online.model." + className);
		Constructor<?> ctor = clazz.getConstructor();
		Object object = ctor.newInstance(new Object[] {});

		return object;
	}

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	private Class<?> getClassType(String className)
			throws ClassNotFoundException {
		return Class.forName("catequese.online.model." + className);
	}

	@ResponseBody
	@RequestMapping(value = "/list/{class}")
	public Object listaRegistros(@PathVariable("class") String className) {

		Class<?> clazz;

		try {
			clazz = getClassType(className);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;

		}

		System.out.println("consultando");

		try {

			CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

			CriteriaQuery criteriaQuery = criteriaBuilder.createQuery();
			Root employee = criteriaQuery.from(clazz);

			criteriaQuery.select(employee);

			Query query = em.createQuery(criteriaQuery);
			Object result = query.getResultList();

			return result;

		} catch (Exception e) {
			System.out.println(e.getMessage());

			return null;
		}

	}

}
