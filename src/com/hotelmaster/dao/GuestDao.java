package com.hotelmaster.dao;

import java.sql.Timestamp;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Page;

public interface GuestDao extends GenericDao<Guest> {
	public List<Guest> findAll(Page page);
	public long getGuestTotalCount();
	public boolean addNewGuest(Guest guest);
	public boolean delGuest(Guest Guest);
	public boolean updateGuest(Guest guest);
	public Guest findGuestByGtId(String gtId);
	public Guest findGuestByGtCardId(String gtCardId);
	public Guest queryGuestInfo(String value,JSONArray fields);
	
	public long calculateGuestsByMonth(Timestamp start, Timestamp end);
}
