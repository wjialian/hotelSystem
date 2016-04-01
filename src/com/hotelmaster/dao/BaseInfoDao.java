package com.hotelmaster.dao;

import com.hotelmaster.po.BaseInfo;

public interface BaseInfoDao extends GenericDao<BaseInfo>{
	BaseInfo findValueByName(String bioName);
}
