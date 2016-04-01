package com.hotelmaster.dao;

import java.sql.Timestamp;
import java.util.List;

import com.hotelmaster.po.Page;
import com.hotelmaster.po.Room;

public interface RoomDao  extends GenericDao<Room>{
	public List<Room> findAll(Page page);
	List<Room> findAvailReserv(Timestamp fromDate,Timestamp toDate
			,String rmCatalog,Page page);
	Long getAvailCount(Timestamp fromDate,Timestamp toDate
			,String rmCatalog);
	Room findById(String rmId);
	List<Room> findReservedRoom();
	public boolean addNewRoom(Room room);
	public boolean deleteRoom(Room room);
	public Long queryRoomCount();
}
