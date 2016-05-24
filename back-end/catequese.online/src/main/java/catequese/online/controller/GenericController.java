package catequese.online.controller;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.SpringSessionContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

//@Controller
//@RequestMapping("/app")
public class GenericController {

	@PersistenceContext(type = PersistenceContextType.EXTENDED)
	public EntityManager em;
	
	
	@Autowired
	private SpringSessionContext sessionContext;

	@ResponseBody
	@RequestMapping(value = "/objeto/{class}")
	public Object getObject(@PathVariable("class") String className)
			throws InstantiationException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException,
			ClassNotFoundException, NoSuchMethodException, SecurityException {

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

	@ResponseBody
	@RequestMapping(value = "/{class}", method = RequestMethod.POST)
	public Integer add(@PathVariable("class") String className,
			@RequestBody String objeto) {

		Class<?> clazz;
		Object object = null;

		try {
			clazz = getClassType(className);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;

		}

		ObjectMapper mapper = new ObjectMapper();
		try {
			object = mapper.readValue(objeto, clazz);
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}

		System.out.println(objeto);
		System.out.println(object);

		//em.getTransaction().begin();
		//em.persist(object);
		//em.flush();
		//em.getTransaction().commit();
		
		businessLogic(object);
		
		return 1;
	}
	

	 
	 @Transactional
	 public void businessLogic(Object object) {
		 
		 sessionContext.currentSession().beginTransaction();
		 sessionContext.currentSession().persist(object);
		 
		 //sessionContext.currentSession().
		 /*UserTransaction utx = (UserTransaction) em.getTransaction(); 
			
		 try { 
		     utx.begin(); 
		  
		     em.persist(object);
		  
		     utx.commit(); 
		 } catch(Exception ex) { 
		     try {
				utx.rollback();
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SystemException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			
			} 

		 }*/
		 
	 }

}
