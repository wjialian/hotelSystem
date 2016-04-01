package com.hotelmaster.daoimpl;

import com.hotelmaster.dao.ReservItemDao;
import com.hotelmaster.po.ReservItem;

public class ReservItemDaoImpl extends GenericHibernateDao<ReservItem> implements ReservItemDao{

	public ReservItemDaoImpl() {
		super(ReservItem.class);
		// TODO Auto-generated constructor stub
	}

}
