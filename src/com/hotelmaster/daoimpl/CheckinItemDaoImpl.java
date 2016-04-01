package com.hotelmaster.daoimpl;

import com.hotelmaster.dao.CheckinItemDao;
import com.hotelmaster.po.CheckinItem;

public class CheckinItemDaoImpl extends GenericHibernateDao<CheckinItem> implements CheckinItemDao{

	public CheckinItemDaoImpl() {
		super(CheckinItem.class);
		// TODO Auto-generated constructor stub
	}
}
