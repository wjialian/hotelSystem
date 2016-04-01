package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.DemandDao;
import com.hotelmaster.dao.FloorDao;
import com.hotelmaster.po.Demand;
import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Page;

public class DemandDaoImpl extends GenericHibernateDao<Demand> implements DemandDao{
	public DemandDaoImpl() {//默认构造方法
		super(Demand.class);
	}

	public List<Demand> showAllDemand() {//查找所有的客房类型
		Page page = new Page(0);//设置当前页为第一页
		return queryForList("select count(*) from Demand","from Demand",null,page);
	}

	public boolean addNewDemand(Demand demand){//添加客房类型
		hibernateTemplate.save(demand);
		return true;
	}

	public boolean delDemand(Demand demand){
		hibernateTemplate.delete(demand);//删除该客房类型
		return true;
	}

}
