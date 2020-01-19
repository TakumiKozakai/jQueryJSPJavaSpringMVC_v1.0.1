package com.fruit.controller.form;

import java.io.Serializable;
import java.util.List;

import com.fruit.domain.data.FruitBox;

public class Form implements Serializable {

	private String regDateYear;
	private String regDateMonth;
	private String regDateDay;
	private String yetSent;
	private String alreadySent;
	private String sentDateYear;
	private String sentDateMonth;
	private String sentDateDay;
	private List<FruitBox> fruitBoxList;

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

	/**
	 * @return yetSent
	 */
	public String getYetSent() {
		return yetSent;
	}

	/**
	 * @param yetSent セットする yetSent
	 */
	public void setYetSent(String yetSent) {
		this.yetSent = yetSent;
	}

	/**
	 * @return alreadySent
	 */
	public String getAlreadySent() {
		return alreadySent;
	}

	/**
	 * @param alreadySent セットする alreadySent
	 */
	public void setAlreadySent(String alreadySent) {
		this.alreadySent = alreadySent;
	}

	/**
	 * @return sentDateYear
	 */
	public String getSentDateYear() {
		return sentDateYear;
	}

	/**
	 * @param sentDateYear セットする sentDateYear
	 */
	public void setSentDateYear(String sentDateYear) {
		this.sentDateYear = sentDateYear;
	}

	/**
	 * @return sentDateMonth
	 */
	public String getSentDateMonth() {
		return sentDateMonth;
	}

	/**
	 * @param sentDateMonth セットする sentDateMonth
	 */
	public void setSentDateMonth(String sentDateMonth) {
		this.sentDateMonth = sentDateMonth;
	}

	/**
	 * @return sentDateDay
	 */
	public String getSentDateDay() {
		return sentDateDay;
	}

	/**
	 * @param sentDateDay セットする sentDateDay
	 */
	public void setSentDateDay(String sentDateDay) {
		this.sentDateDay = sentDateDay;
	}

	/**
	 * @return fruitBoxList
	 */
	public List<FruitBox> getFruitBoxList() {
		return fruitBoxList;
	}

	/**
	 * @param fruitList セットする fruitBoxList
	 */
	public void setFruitBoxList(List<FruitBox> fruitBoxList) {
		this.fruitBoxList = fruitBoxList;
	}

}
