package com.fruit.domain.data;

import java.io.Serializable;

/**
 * 果物
 * （果物名、グループ番号、発送状態コード）
 */
public class Fruit implements Serializable {

	private String fruitName;
	private int groupNo;
	/** 00:未発送、01:発送済み*/
	private String sendStatusCd;

	/**
	 * コンストラクタ
	 */
	public Fruit(
			String fruitName,
			int groupNo,
			String sendStatusCd) {

		this.fruitName = fruitName;
		this.groupNo = groupNo;
		this.sendStatusCd = sendStatusCd;
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
	public int getFruitNo() {
		return groupNo;
	}

	/**
	 * @param fruitNo セットする groupNo
	 */
	public void setFruitNo(int groupNo) {
		this.groupNo = groupNo;
	}

	/**
	 * @return sendStatusCd
	 */
	public String getSendStatusCd() {
		return sendStatusCd;
	}

	/**
	 * @param sendStatusCd セットする sendStatusCd
	 */
	public void setSendStatusCd(String sendStatusCd) {
		this.sendStatusCd = sendStatusCd;
	}

}
