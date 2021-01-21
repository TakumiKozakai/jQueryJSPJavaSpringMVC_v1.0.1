package com.fruit.domain.bean;

import java.util.List;

import com.fruit.domain.data.FruitBox;

public class CreateFruit_ResponseBean {

	private List<FruitBox> fruitBoxList;

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
