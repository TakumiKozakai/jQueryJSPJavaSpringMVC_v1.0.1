package com.fruit.domain.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fruit.domain.data.FruitBox;

@JsonIgnoreProperties(ignoreUnknown=true)
public class CheckSentDate_RequestBean {

	private String sentFlag;
	private String sentDateYear;
	private String sentDateMonth;
	private String sentDateDay;
	private List<FruitBox> fruitBoxList;

	/**
	 * @return sentFlag
	 */
	public String getSentFlag() {
		return sentFlag;
	}

	/**
	 * @param sentFlag セットする sentFlag
	 */
	public void setSentFlag(String sentFlag) {
		this.sentFlag = sentFlag;
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
