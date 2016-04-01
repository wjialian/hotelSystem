package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.GuestHistory;
import com.hotelmaster.po.Page;

public interface GuestHistoryDao extends GenericDao<GuestHistory>{
	public List<GuestHistory> findAll(Page page);
	public List<Balancement> queryHistoryBalancement(Page page,String gtId);
	public long getHistoryTotalCount(String gtId);
	public boolean updateHistoryInfo(GuestHistory guestHistory);
	public GuestHistory queryHistoryInfo(String gtId);
	public void createGuestHistory(GuestHistory guestHistory);
}
