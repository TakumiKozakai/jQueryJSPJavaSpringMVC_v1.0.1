package com.fruit.domain.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fruit.domain.bean.CreateFruit_RequestBean;
import com.fruit.domain.bean.CreateFruit_ResponseBean;
import com.fruit.domain.data.Fruit;
import com.fruit.domain.data.FruitBox;

@Service
public class CreateFruitServiceImpl implements CreateFruitService {

	public CreateFruit_ResponseBean process(CreateFruit_RequestBean req) {

		CreateFruit_ResponseBean res = new CreateFruit_ResponseBean();

		this.createFruitBox(req, res);

		return res;
	};

	private void createFruitBox(CreateFruit_RequestBean req, CreateFruit_ResponseBean res) {

		List<Fruit> appleList = new ArrayList<Fruit>();
		appleList.add(this.createFruit("apple", 1, "未発送"));
		appleList.add(this.createFruit("apple", 2, "未発送"));

		List<Fruit> orangeList = new ArrayList<Fruit>();
		orangeList.add(this.createFruit("orange", 1, "未発送"));

		List<Fruit> bananaList = new ArrayList<Fruit>();
		bananaList.add(this.createFruit("banana", 1, "未発送"));
		bananaList.add(this.createFruit("banana", 2, "発送済"));

        //カレンダーを生成
        Calendar cal = Calendar.getInstance();
        //フォーマットを設定して出力
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
        String today = sdf.format(cal.getTime());

		List<FruitBox> fruitBoxList = new ArrayList<FruitBox>();
		fruitBoxList.add(new FruitBox("リンゴ", 1, today, today, false, appleList));
		fruitBoxList.add(new FruitBox("オレンジ", 2, today, today, false, orangeList));
		fruitBoxList.add(new FruitBox("バナナ", 3, today, today, false, bananaList));

		res.setFruitBoxList(fruitBoxList);
	}

	private Fruit createFruit(String fruitName, int groupNo, String sendStatusCd) {

		Fruit fruit = new Fruit(
				fruitName,
				groupNo,
				sendStatusCd);

		return fruit;
	}

}
