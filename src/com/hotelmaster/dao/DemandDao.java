package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.Demand;
import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Page;

public interface DemandDao extends GenericDao<Demand>{
	public List<Demand> showAllDemand();
	public boolean addNewDemand(Demand demand);
	public boolean delDemand(Demand demand);
}
