package com.example.demo;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Kozakaitakumi
 *
 */
@Controller
public class HomeController {

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

		List<String> fruits = new ArrayList<String>();
		fruits.add("apple");
		fruits.add("banana");
		fruits.add("cherry");
		model.addAttribute("fruits", fruits);

		this.convertJsonFruitList(model, form);
		model.addAttribute("form", form);

		return "home";
	}

	/**
	 * @param model
	 * @param form
	 */
	private void convertJsonFruitList(Model model, Form form) {

		Fruit apple = new Fruit(
				"apple",
				"001",
				"2019年12月15日",
				"2019",
				"12",
				"15",
				false);
		Fruit banana = new Fruit(
				"banana",
				"002",
				"2019年12月15日",
				"2019",
				"12",
				"15",
				false);
		Fruit grape = new Fruit(
				"grape",
				"001",
				"2019年12月15日",
				"2019",
				"12",
				"15",
				false);

		ArrayList<Fruit> fruitList = new ArrayList<Fruit>();
		fruitList.add(apple);
		fruitList.add(banana);
		fruitList.add(grape);

		form.setFruitList(fruitList);

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			model.addAttribute("fruitList", replaceSingleQuoteJson(objectMapper.writeValueAsString(fruitList)));

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
	public String checkRegDate(@RequestParam String requestStrJson, HttpServletRequest request)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		checkRegDate_RequestBean req = new checkRegDate_RequestBean();
		checkRegDate_ResponseBean res = new checkRegDate_ResponseBean();

		req = objectMapper.readValue(requestStrJson, checkRegDate_RequestBean.class);
		res.setResult("success");

		if(4 < req.getRegDateYear().length()) {
			res.setResult("error");
		}
		if(2 < req.getRegDateMonth().length()) {
			res.setResult("error");
		}
		if(2 < req.getRegDateDay().length()) {
			res.setResult("error");
		}

		String strResponse = objectMapper.writeValueAsString(res);

		return strResponse;

	}

	/**
	 * @param form
	 * @param model
	 * @return
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@PostMapping(value = "/checkRegDatePost")
	@ResponseBody
	public String checkRegDate(@ModelAttribute("form") Form form, HttpServletRequest request)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		checkRegDate_RequestBean req = new checkRegDate_RequestBean();
		checkRegDate_ResponseBean res = new checkRegDate_ResponseBean();

		BeanUtils.copyProperties(form, req);
		res.setResult("success");

		if(4 < req.getRegDateYear().length()) {
			res.setResult("error");
		}
		if(2 < req.getRegDateMonth().length()) {
			res.setResult("error");
		}
		if(2 < req.getRegDateDay().length()) {
			res.setResult("error");
		}

		String strResponse = objectMapper.writeValueAsString(res);

		return strResponse;

	}

	/**
	 * @param target
	 * @return
	 */
	private String replaceSingleQuoteJson(String target) {
		return target.replaceAll("'", "\\\\'").replaceAll("(?<!\\\\)\"", "'");
	}

}