package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.FloorDao;
import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Page;

public class FloorDaoImpl extends GenericHibernateDao<Floor> implements FloorDao{
	public FloorDaoImpl() {//默认构造方法
		super(Floor.class);
	}

	public List<Floor> showAllFloor() {//查找所有的客房类型
		Page page = new Page(0);//设置当前页为第一页
		return queryForList("select count(*) from Floor","from Floor",null,page);
	}

	public boolean addNewFloor(Floor floor){//添加客房类型
		String id = floor.getfloorId();//获得客房类型编号
		Long count=(Long)queryForObject(
				"select count(*) from Floor where floorId=?"
				,new Object[] {id});//根据客房类型编号查找客房类型
		if(count.longValue()==0){//记录数为0
			hibernateTemplate.save(floor);//保存客房类型
			return true;
		}
		else{//记录数不为0
			log.info("该客房类型以及存在！");
			return false;
		}
	}

	public boolean delFloor(Floor floor){
		Long count=(Long)queryForObject(
				"select count(*) from Floor where floorId=?"
				,new Object[] {floor.getfloorId()});//查找该客房类型
		if(count.longValue()==0){					//判断记录数是否为0
			return false;
		}
		else{									//记录数不为0
			hibernateTemplate.delete(floor);//删除该客房类型
			return true;
		}	
	}

}
