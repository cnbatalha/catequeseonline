package catequese.online;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import catequese.online.controller.DefaultController;
import catequese.online.repository.CatequistaRepository;

//@Configuration

//@EnableWebMvc

//@PropertySource(value = { "classpath:application.properties" })

//@EnableJpaRepositories

//@EnableTransactionManagement

//@ComponentScan(basePackageClasses = {DefaultController.class, CatequistaRepository.class})
public class Application extends WebMvcConfigurerAdapter {
	
	
}
