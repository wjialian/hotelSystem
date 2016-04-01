package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.RoomCatalogDao;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.Room;
import com.hotelmaster.po.RoomCatalog;

public class RoomCatalogDaoImpl extends GenericHibernateDao<RoomCatalog> implements RoomCatalogDao{
	public RoomCatalogDaoImpl() {//默认构造方法
		super(RoomCatalog.class);
	}

	public List<RoomCatalog> showAllRoomCatalog() {//查找所有的客房类型
		Page page = new Page(0);//设置当前页为第一页
		return queryForList(
				"select count(*) from RoomCatalog"
				,"from RoomCatalog"
				,null,page
		);
	}

	public boolean addNewRoomCatalog(RoomCatalog roomCatalog) {//添加客房类型
		String id = roomCatalog.getRcId();//获得客房类型编号
		Long count=(Long)queryForObject(
				"select count(*) from RoomCatalog where rcId=?"
				,new Object[] {id});//根据客房类型编号查找客房类型
		if(count.longValue()==0){//记录数为0
			hibernateTemplate.save(roomCatalog);//保存客房类型
			return true;
		}
		else{//记录数不为0
			log.info("该客房类型以及存在！");
			return false;
		}
	}

	public boolean delRoomCatalog(RoomCatalog roomCatalog) {
		Long count=(Long)queryForObject(
				"select count(*) from RoomCatalog where rcId=?"
				,new Object[] {roomCatalog.getRcId()});//查找该客房类型
		if(count.longValue()==0){					//判断记录数是否为0
			return false;
		}
		else{									//记录数不为0
			hibernateTemplate.delete(roomCatalog);//删除该客房类型
			return true;
		}	
	}

}
