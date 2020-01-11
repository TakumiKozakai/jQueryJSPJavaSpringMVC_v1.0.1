package com.example.demo;

public class Fruit {

	private String fruitName;
	private String fruitNo;
	private String regDate;
	private String regDateYear;
	private String regDateMonth;
	private String regDateDay;
	private boolean newFlag;

	/**
	 * コンストラクタ
	 * @param fruit
	 * @param newFlag
	 */
	public Fruit(
			String fruitName,
			String fruitNo,
			String regDate,
			String regDateYear,
			String regDateMonth,
			String regDateDay,
			boolean newFlag) {

		this.fruitName = fruitName;
		this.fruitNo = fruitNo;
		this.regDate = regDate;
		this.regDateYear = regDateYear;
		this.regDateMonth = regDateMonth;
		this.regDateDay = regDateDay;
		this.newFlag = newFlag;

	};

	/**
	 * @return fruit
	 */
	public String getFruitName() {
		return fruitName;
	}

	/**
	 * @param fruit セットする fruit
	 */
	public void setFruitName(String fruitName) {
		this.fruitName = fruitName;
	}

	/**
	 * @return fruitNo
	 */
	public String getFruitNo() {
		return fruitNo;
	}

	/**
	 * @param fruitNo セットする fruitNo
	 */
	public void setFruitNo(String fruitNo) {
		this.fruitNo = fruitNo;
	}

	/**
	 * @return regDate
	 */
	public String getRegDate() {
		return regDate;
	}

	/**
	 * @param regDate セットする regDate
	 */
	public void setRegDate(String regDate) {
		this.regDate = regDate;
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
	 * @return regDateDary
	 */
	public String getRegDateDay() {
		return regDateDay;
	}

	/**
	 * @param regDateDary セットする regDateDary
	 */
	public void setRegDateDay(String regDateDay) {
		this.regDateDay = regDateDay;
	}

	/**
	 * @return newFlag
	 */
	public boolean isNewFlag() {
		return newFlag;
	}

	/**
	 * @param newFlag セットする newFlag
	 */
	public void setNewFlag(boolean newFlag) {
		this.newFlag = newFlag;
	}

}
