package com.example.demo;

import java.util.List;

public class Form {

	private List<Fruit> fruitList;
	private String regDateYear;
	private String regDateMonth;
	private String regDateDay;

	/**
	 * @return fruitList
	 */
	public List<Fruit> getFruitList() {
		return fruitList;
	}

	/**
	 * @param fruitList セットする fruitList
	 */
	public void setFruitList(List<Fruit> fruitList) {
		this.fruitList = fruitList;
	}

	/**
	 * @return regDateYear
	 */
	public String getRegDateYear() {
		return regDateYear;
	}

	/**
	 * @param regDateYear セットする regDateYear
	 */
	public void setRegDateYear(String regDateYear) {
		this.regDateYear = regDateYear;
	}

	/**
	 * @return regDateMonth
	 */
	public String getRegDateMonth() {
		return regDateMonth;
	}

	/**
	 * @param regDateMonth セットする regDateMonth
	 */
	public void setRegDateMonth(String regDateMonth) {
		this.regDateMonth = regDateMonth;
	}

	/**
	 * @return regDateDay
	 */
	public String getRegDateDay() {
		return regDateDay;
	}

	/**
	 * @param regDateDay セットする regDateDay
	 */
	public void setRegDateDay(String regDateDay) {
		this.regDateDay = regDateDay;
	}

}
