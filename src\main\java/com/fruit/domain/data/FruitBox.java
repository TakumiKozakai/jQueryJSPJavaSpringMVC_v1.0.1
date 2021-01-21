package com.fruit.domain.data;

import java.io.Serializable;
import java.util.List;

/**
 * 果物箱
 * （果物リスト、箱名、箱番号、登録日、新規作成フラグ）
 */
public class FruitBox implements Serializable {

	private String boxName;
	private int boxNo;
	private String regDate;
	private String sentDate;
	private boolean newFlag;
	private List<Fruit> fruitList;

	/**
	 * コンストラクタ
	 */
	public FruitBox(
			String boxName,
			int boxNo,
			String regDate,
			String sentDate,
			boolean newFlag,
			List<Fruit> fruitList) {

		this.boxName = boxName;
		this.boxNo = boxNo;
		this.regDate = regDate;
		this.sentDate = sentDate;
		this.newFlag = newFlag;
		this.fruitList = fruitList;
	}

	/**
	 * コンストラクタ
	 */
	public FruitBox() {

	}

	/**
	 * @return boxName
	 */
	public String getBoxName() {
		return boxName;
	}

	/**
	 * @param boxName セットする boxName
	 */
	public void setBoxName(String boxName) {
		this.boxName = boxName;
	}

	/**
	 * @return boxNo
	 */
	public int getBoxNo() {
		return boxNo;
	}

	/**
	 * @param boxNo セットする boxNo
	 */
	public void setBoxNo(int boxNo) {
		this.boxNo = boxNo;
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
	 * @return sentDate
	 */
	public String getSentDate() {
		return sentDate;
	}

	/**
	 * @param sentDate セットする sentDate
	 */
	public void setSentDate(String sentDate) {
		this.sentDate = sentDate;
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

	/**
	 * @return fruitList
	 */
	public List<Fruit> getFruitList() {
		return fruitList;
	}

	/**
	 * @param fruit セットする fruit
	 */
	public void setFruitList(List<Fruit> fruitList) {
		this.fruitList = fruitList;
	}

}
