package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.BaseInfoDao;
import com.hotelmaster.po.BaseInfo;

public class BaseInfoDaoImpl extends GenericHibernateDao<BaseInfo> implements BaseInfoDao{
	public BaseInfoDaoImpl() {
		super(BaseInfo.class);
		// TODO Auto-generated constructor stub
	}

	public BaseInfo findValueByName(String bioName) {
		// TODO Auto-generated method stub
		List<BaseInfo> values=hibernateTemplate.find("from BaseInfo baseInfo where baseInfo.bioName=?",bioName);	
		return values.get(0);
	}
	
}
