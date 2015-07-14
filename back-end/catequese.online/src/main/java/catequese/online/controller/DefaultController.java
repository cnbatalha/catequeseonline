package catequese.online.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DefaultController {

	@RequestMapping(value = "/rest/info", method = RequestMethod.GET)
	public @ResponseBody String info(String msg) {
		return "Teste ECO";
	}

}
