package catequese.online.reflection.test;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import catequese.online.controller.GenericController;

public class MainReflectionTest {

	public static void main(String[] args) {

		GenericController cc = new GenericController();
		cc.setEntityManager( getEntityManager() );

		try {
			Object object = cc.getObject("Catequizando");
			System.out.println(object);
			
			Object objectList = cc.listaRegistros("Catequizando");
			
			System.out.println(objectList);
			
		} catch (InstantiationException | IllegalAccessException
				| IllegalArgumentException | InvocationTargetException
				| ClassNotFoundException | NoSuchMethodException
				| SecurityException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	
	
	private static EntityManager getEntityManager()
	{
		Map<String, String> properties = new HashMap<String, String>();
		properties.put("hibernate.connection.url","jdbc:mysql://localhost/catequese");
		properties.put("hibernate.connection.driver_class","com.mysql.jdbc.Driver");
		properties.put("hibernate.connection.username","root");
		properties.put("hibernate.connection.password","q1w2e3");
	
		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("catequese.online", properties);

		// Map<String, String> properties = new HashMap<String, String>();

		// properties.put("javax.persistence.jdbc.url",
		// "jdbc:postgresql://localhost:5432/postgres");
		// properties
		// .put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
		// properties.put("javax.persistence.jdbc.user", "postgres");
		// properties.put("javax.persistence.jdbc.password", "q1w2e");

		EntityManager em = emf.createEntityManager();
		
		return em;
	}
	
	public static void crinadoClass()
	{
		
	}

}
