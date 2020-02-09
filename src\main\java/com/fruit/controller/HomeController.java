package com.fruit.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fruit.controller.form.Form;
import com.fruit.domain.bean.CheckRegDate_RequestBean;
import com.fruit.domain.bean.CheckRegDate_ResponseBean;
import com.fruit.domain.bean.CheckSentDate_RequestBean;
import com.fruit.domain.bean.CheckSentDate_ResponseBean;
import com.fruit.domain.bean.CreateFruit_RequestBean;
import com.fruit.domain.bean.CreateFruit_ResponseBean;
import com.fruit.domain.data.FruitBox;
import com.fruit.domain.service.CreateFruitServiceImpl;

/** *
 */
@Controller
public class HomeController {

	@Autowired
	private CreateFruitServiceImpl createFruitServiceImpl;

	/**
	 *
	 */
	@Value("${application.name}")
	private String appName;

	/**
	 * @param form
	 * @param model
	 * @return
	 */
	@GetMapping(value = "/")
	public String hello(@ModelAttribute("form") Form form, Model model) {

		model.addAttribute("message", "Hello World");
		model.addAttribute("now", LocalDateTime.now());
		model.addAttribute("appName", appName);

		CreateFruit_RequestBean req = new CreateFruit_RequestBean();
		CreateFruit_ResponseBean res = this.createFruitServiceImpl.process(req);

		this.convertJsonFruitList(model, res);
		model.addAttribute("form", form);

		return "home";
	}

	/**
	 * @param model
	 * @param form
	 */
	private void convertJsonFruitList(Model model, CreateFruit_ResponseBean res) {

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			model.addAttribute("fruitBoxList", this.replaceSingleQuote(objectMapper.writeValueAsString(res.getFruitBoxList())));

		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

	}

	/**
	 * @param form
	 * @param model
	 * @return
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@GetMapping(value = "/checkRegDateGet")
	@ResponseBody
	public String checkRegDate(@RequestParam String jsonRequestBean, HttpServletRequest request)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		CheckRegDate_RequestBean req = new CheckRegDate_RequestBean();
		CheckRegDate_ResponseBean res = new CheckRegDate_ResponseBean();

		req = objectMapper.readValue(jsonRequestBean, CheckRegDate_RequestBean.class);
		res.setResult("NORMAL");

		if(4 < req.getRegDateYear().length()) {
			res.setResult("ERROR");
		}
		if(2 < req.getRegDateMonth().length()) {
			res.setResult("ERROR");
		}
		if(2 < req.getRegDateDay().length()) {
			res.setResult("ERROR");
		}

		String strResponse = objectMapper.writeValueAsString(res);

		return strResponse;

	}

	/**
	 * @param form
	 * @return
	 * @throws IOException
	 */
	@PostMapping(value = "/checkSentDatePost")
	@ResponseBody
	public String checkSentDate(@RequestBody String jsonRequestBean) {

		String strResponse  = "";

		try {

			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(jsonRequestBean);

			CheckSentDate_RequestBean req = new CheckSentDate_RequestBean();
			CheckSentDate_ResponseBean res = new CheckSentDate_ResponseBean();

			List<FruitBox> fruitBoxList = new ArrayList<FruitBox>();

			for (int i = 0; i < jsonNode.get("fruitBoxList").size(); i++) {
				FruitBox fruitBox = new FruitBox();
				fruitBox.setBoxName(jsonNode.get("fruitBoxList").get(i).get("boxName").asText());
				fruitBox.setRegDate(jsonNode.get("fruitBoxList").get(i).get("regDate").asText());
				fruitBox.setSentDate(jsonNode.get("fruitBoxList").get(i).get("sentDate").asText());

				fruitBoxList.add(fruitBox);
			}

			req.setSentFlag(jsonNode.get("sentFlag").asText());
			req.setFruitBoxList(fruitBoxList);

			res.setResult("NORMAL");

			strResponse = objectMapper.writeValueAsString(res);

		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return strResponse;

	}

	/**
	 * @param target
	 * @return
	 */
	private String replaceSingleQuote(String target) {
		return target.replaceAll("'", "\\\\'").replaceAll("(?<!\\\\)\"", "'");
	}

}