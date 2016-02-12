package catequese.online.reflection.test;

import java.lang.reflect.InvocationTargetException;

import catequese.online.controller.GenericController;

public class MainReflectionTest {

	public static void main(String[] args) {

		GenericController cc = new GenericController();

		try {
			Object object = cc.getObject("catequese.online.model.Catequizando");
			System.out.println(object);
		} catch (InstantiationException | IllegalAccessException
				| IllegalArgumentException | InvocationTargetException
				| ClassNotFoundException | NoSuchMethodException
				| SecurityException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}

}
