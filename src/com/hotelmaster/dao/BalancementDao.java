package com.hotelmaster.dao;

import com.hotelmaster.po.Balancement;

public interface BalancementDao extends GenericDao<Balancement>{
	public String createBalancement(Balancement balancement);
	public Balancement findBalancementInformationByBmId(String bmId);
}
