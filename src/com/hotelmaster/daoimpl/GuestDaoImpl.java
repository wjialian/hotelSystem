package com.hotelmaster.daoimpl;

import java.sql.Timestamp;
import java.util.List;

import net.sf.json.JSONArray;

import com.hotelmaster.dao.GuestDao;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Page;

public class GuestDaoImpl extends GenericHibernateDao<Guest> implements GuestDao{

	public GuestDaoImpl() {
		super(Guest.class);
		// TODO Auto-generated constructor stub
	}
	
	

	public long calculateGuestsByMonth(Timestamp start, Timestamp end) {
		// TODO Auto-generated method stub
		return (Long)queryForObject(
				"select count(*) from Guest where gtCreateTime<? and gtCreateTime>?"
				,new Object[] {end,start});
	}


	public List<Guest> findAll(Page page) {
		// TODO Auto-generated method stub

		return queryForList(
				"select count(*) from Guest"
				,"from Guest"
				,null,page
		);
	}

	public long getGuestTotalCount() {
		// TODO Auto-generated method stub
		return (Long)queryForObject(
				"select count(*) from Guest",null
			);
	}

	public boolean addNewGuest(Guest guest) {
		Long count=(Long)queryForObject(
		"select count(*) from Guest where gtName=? and gtCardId =?"
		,new Object[] {guest.getGtName(),guest.getGtCardId()});
		if(count.longValue()==0){//不存在该客户
			hibernateTemplate.save(guest);//保存该客户信息
			return true;
		}
		else{
			log.info("该客户信息已经存在!");
			return false;
		}
	}
	
	public boolean delGuest(Guest guest){
		Guest delGuest = new Guest();
		delGuest = guest;
		Long count=(Long)queryForObject(
				"select count(*) from Guest where gtId=?"
				,new Object[] {guest.getGtId()});
		if(count.longValue()==0){
			return false;
		}
		else{
			hibernateTemplate.delete(delGuest);
			return true;
		}	
	}

	public Guest findGuestByGtId(String gtId) {
		// TODO Auto-generated method stub
		List guest= hibernateTemplate.find("from Guest where gtId='"+gtId+"'");
		if(guest.size()!=0){
			return (Guest)guest.get(0);
		}else{
			return null;
		}
	}

	public Guest findGuestByGtCardId(String gtCardId) {
		// TODO Auto-generated method stub
		List<Guest> guest= hibernateTemplate.find("from Guest where gtCardId='"+gtCardId+"'");
		if(guest.size()!=0){
			return guest.get(0);
		}else{
			return null;
		}
	}
	
	public Guest queryGuestInfo(String value, JSONArray fields) {
		/*Page page = new Page(0);
		String sql = "from Guest where";
		for(int i=0;i<fields.size();i++){
			sql = sql+"?=?";
		}//like 'from guest where gtId = ? or' no finish
		List<Guest> guest= queryForList(
				"select count(*) from Guest"
				,"from Guest where gtId = ?"
				,new Object[] {fields.get(0),value},page
		);*/
		List<Guest> guest= hibernateTemplate.find("from Guest where gtId='"+value+"'");
		if(guest.size()!=0){
			return guest.get(0);
		}else{
			return null;
		}
	}

	public boolean updateGuest(Guest guest) {
		// TODO Auto-generated method stub
		hibernateTemplate.update(guest);
		return true;
	}
	
	
}
