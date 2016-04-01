package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.GuestHistoryDao;
import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.GuestHistory;
import com.hotelmaster.po.Page;

public class GuestHistoryDaoImpl extends GenericHibernateDao<GuestHistory> implements GuestHistoryDao{

	public GuestHistoryDaoImpl() {
		super(GuestHistory.class);
		// TODO Auto-generated constructor stub
	}

	
	public void createGuestHistory(GuestHistory guestHistory) {
		// TODO Auto-generated method stub
		hibernateTemplate.save(guestHistory);
	}


	public List<GuestHistory> findAll(Page page) {
		// TODO Auto-generated method stub
		return queryForList(
				"select count(*) from GuestHistory"
				,"from GuestHistory"
				,null,page
		);	
	}
	
	public List<Balancement> queryHistoryBalancement(Page page,String gtId) {
		// TODO Auto-generated method stub
		return queryForList(
				"select count(*) from GuestHistory where ghGuestId = '"+gtId+"'"
				,"from Balancement where bmGuestId = '"+gtId+"')"
				,null//new Object[] {gtId,gtId}
				,page
		);
	}

	public long getHistoryTotalCount(String gtId) {
		// TODO Auto-generated method stub
		return (Long)queryForObject(
				"select count(*) from GuestHistory where ghGuestId = ?",new Object[]{gtId}
			);
	}

	public boolean updateHistoryInfo(GuestHistory guestHistory) {
		// TODO Auto-generated method stub
		hibernateTemplate.update(guestHistory);
		return true;
	}

	public GuestHistory queryHistoryInfo(String gtId) {
		// TODO Auto-generated method stub
		List<GuestHistory> guestHistory = hibernateTemplate.find("from GuestHistory where ghGuestId='"+gtId+"'");
		if(guestHistory.size()!=0){
			return guestHistory.get(0);
		}else{
			return null;
		}
	}
}
