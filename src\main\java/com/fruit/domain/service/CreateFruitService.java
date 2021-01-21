package com.fruit.domain.service;

import com.fruit.domain.bean.CreateFruit_RequestBean;
import com.fruit.domain.bean.CreateFruit_ResponseBean;

public interface CreateFruitService {

	public CreateFruit_ResponseBean process(CreateFruit_RequestBean req);

}
