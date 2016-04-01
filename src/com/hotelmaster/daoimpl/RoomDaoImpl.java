package com.hotelmaster.daoimpl;

import java.sql.Timestamp;
import java.util.List;

import com.hotelmaster.dao.RoomDao;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.Room;

public class RoomDaoImpl extends GenericHibernateDao<Room> implements RoomDao{
	
	public RoomDaoImpl() {
		super(Room.class);
	}
	
	public boolean addNewRoom(Room room) {
		// TODO Auto-generated method stub
		String id = room.getRmId();
		Long count=(Long)queryForObject(
				"select count(*) from Room where rmId=?"
				,new Object[] {id});
		if(count.longValue()==0){
			hibernateTemplate.save(room);
			return true;
		}
		else{
			log.info("The data was exist in database");
			return false;
		}
	}

	/*public boolean updateRoom(Room room) {
			// TODO Auto-generated method stub
		String id = room.getRmId();
		Long count=(Long)queryForObject(
				"select count(*) from Room where rmId=?"
				,new Object[] {id});
		if(count.longValue()==0){
			log.info("The data wasn't exist in database");
			return false;
		} else{
			hibernateTemplate.update(room);
			return true;
		}
	}*/

	public List<Room> findAll(Page page) {
		return queryForList("select count(*) from Room",
		"from Room",null,page);
	}
	
	public Long queryRoomCount() {
		return (Long)queryForObject(
				"select count(*) from Room",null
			);
	}

	public boolean deleteRoom(Room room) {
			Room delRoom = new Room();
			delRoom = room;
			Long count=(Long)queryForObject(
					"select count(*) from Room where rmId=?"
					,new Object[] {room.getRmId()});
			if(count.longValue()==0){
				return false;
			}
			else{
				hibernateTemplate.delete(delRoom);
				return true;
			}	
	}

	public Room findById(String rmId) {
		List rooms= hibernateTemplate.find("from Room as rm where rm.rmId='"+rmId+"'");
		return (Room)rooms.get(0);
	}
	public List<Room> findAvailReserv(Timestamp fromDate,Timestamp toDate 
			,String rmCatalog,final Page page) { 
		if(rmCatalog.equals("全部")){
			return queryForList(
					"select count(*)" +
					"from Room as room where not (room.rmId) in (" +
					"select checkinItem.room from CheckinItem checkinItem where " +
					"checkinItem.cimInDatetime>=? or checkinItem.cimOutDatetime<=?)" +
					"and not(room.rmId) in (" +
					"select reservItem.room from ReservItem reservItem where " +
					"reservItem.rimInDateTime>=? or reservItem.rimOutDateTime<=?) " +
					"and room.rmAvailable=true"
					,"from Room as room where not (room.rmId) in (" +
						"select checkinItem.room from CheckinItem checkinItem where " +
						"checkinItem.cimInDatetime>=? or checkinItem.cimOutDatetime<=?)" +
						"and not(room.rmId) in (" +
						"select reservItem.room from ReservItem reservItem where " +
						"reservItem.rimInDateTime>=? or reservItem.rimOutDateTime<=?) " +
						"and room.rmAvailable=true"
						,new Object[]{fromDate,toDate,fromDate,toDate}
					,page);
		}
		return queryForList(
				"select count(*)" +
				"from Room as room where not (room.rmId) in (" +
				"select checkinItem.room from CheckinItem checkinItem where " +
				"checkinItem.cimInDatetime>=? or checkinItem.cimOutDatetime<=?)" +
				"and not(room.rmId) in (" +
				"select reservItem.room from ReservItem reservItem where " +
				"reservItem.rimInDateTime>=? and reservItem.rimOutDateTime<=?) " +
				"and room.rmAvailable=true or room.rmCatalog=?"
				,"from Room as room where not (room.rmId) in (" +
					"select checkinItem.room from CheckinItem checkinItem where " +
					"checkinItem.cimInDatetime>=? or checkinItem.cimOutDatetime<=?)" +
					"and not(room.rmId) in (" +
					"select reservItem.room from ReservItem reservItem where " +
					"reservItem.rimInDateTime>=? or reservItem.rimOutDateTime<=?) " +
					"and room.rmAvailable=true and room.rmCatalog=?" 
					,new Object[]{fromDate,toDate,fromDate,toDate,rmCatalog}
				,page);
	}

	public Long getAvailCount(Timestamp fromDate,Timestamp toDate	
			,String rmCatalog) {
		String selectCount="select count(*)" +
		"from Room as room where not (room.rmId) in (" +
		"select checkinItem.room from CheckinItem checkinItem where " +
		"checkinItem.cimInDatetime>=? and checkinItem.cimOutDatetime<=? and checkinItem.room.rmCatalog=?)" +
		"and not(room.rmId) in (" +
		"select reservItem.room from ReservItem reservItem where " +
		"reservItem.rimInDateTime>=? and reservItem.rimOutDateTime<=? and reservItem.room.rmCatalog=?)" +
		"and room.rmAvailable=true";
		Long count = (Long)queryForObject(selectCount, new Object[]{fromDate,toDate,rmCatalog,fromDate,toDate,rmCatalog});
		return count;
	}

	public List<Room> findReservedRoom() {
		//List<Room> roomList = hibernateTemplate.find("from Room");
		return hibernateTemplate.find("from Room room where room.rmState='1'");
	}
	
}
