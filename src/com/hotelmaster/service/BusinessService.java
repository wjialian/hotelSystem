package com.hotelmaster.service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.springframework.transaction.annotation.Transactional;

import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.BaseInfo;
import com.hotelmaster.po.CheckinItem;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.Demand;
import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.GuestHistory;
import com.hotelmaster.po.Operator;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.ReservItem;
import com.hotelmaster.po.ReservOrder;
import com.hotelmaster.po.Room;
import com.hotelmaster.po.RoomCatalog;

/**
 * Class description goes here.
 * 
 * @
 * @Date Apr 19, 2008
 */
@Transactional
public interface BusinessService {
	Room findRoomById(String rmId);
	public boolean addNewRoom(Room room);
	List<Room> findAllRooms(Page page);
	List<Room> findAvailReservRooms(Timestamp fromDate,Timestamp toDate
			,String rmCatalog,Page page);
	void updateRoom(Room room);
	public boolean deleteRoom(Room room);
	Operator findOperatorByUserId(String opUserName);
	boolean createCheckinOrder(CheckinOrder checkinOrder,List<CheckinItem> checkinItemList);
	CheckinOrder findCheckinOrderByRmId(String rmId);
	public CheckinOrder findCheckinOrderByCioOrderId(String cioOrderId);
	public CheckinOrder findCheckinOrderByCioId(String cioId);
	boolean createReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList);
	
	public Balancement findBalancementInformationByBmId(String bmId);
	
	public List<Guest> findAllGuests(Page page);
	public long getGuestTotalCount();
	public boolean addNewGuest(Guest guest);
	public boolean delGuest(Guest guest);
	public boolean updateGuest(Guest guest);
	public Guest findGuestByGtId(String gtId);
	public Guest findGuestByGtCardId(String gtCardId);
	public Guest queryGuestInfo(String value,JSONArray fields);
	
	public List<GuestHistory> findAllGuestHistory(Page page);
	public List<Balancement> queryHistoryInformation(Page page,String gtId);
	public long getHistoryTotalCount(String gtId);
	public boolean updateHistoryInfo(GuestHistory guestHistory);
	public GuestHistory queryHistoryInfo(String gtId);
	public void createGuestHistory(GuestHistory guestHistory);
	
	public List<ReservOrder> findReservByMrCodeId(String mrcodeid);
	List<ReservOrder> findAvailReservOrders(Page page);
	List<ReservOrder> findTodayReservOrders();
	ReservOrder findReservById(String roId);
	List<ReservItem> findReservItemByOrder(ReservOrder reservOrder);
	ReservOrder findReservOrderByRmId(String rmId);
	void deleteReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList);
	void updateReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList);
	void deleteReservOrderItem(String roId);
	String createBalancement(Balancement balancement);
	
	public long calculateGuestsByMonth(Timestamp start, Timestamp end);
	public Map<String,String> calculateAccommodationByQuarter(String year) throws ParseException;
	BaseInfo findBaseInfoByName(String bioName);
	void updateBaseInfoCioOrder(BaseInfo baseInfo);
	
	public List<RoomCatalog> showAllRoomCatalog();
	public void updateRoomCatalog(RoomCatalog roomCatalog);
	public boolean addNewRoomCatalog(RoomCatalog roomCatalog);
	public boolean delRoomCatalog(RoomCatalog roomCatalog);
	public Long queryRoomCount();
	
	public List<Floor> showAllFloor();
	public void updateFloor(Floor floor);
	public boolean addNewFloor(Floor floor);
	public boolean delFloor(Floor floor);
	
	public List<Demand> showAllDemand();
	public boolean addNewDemand(Demand demand);
	public boolean delDemand(Demand demand);
	
	public List<Operator> showAllOperators();
	public boolean addNewOperator(Operator operator);
	public boolean deleteOperator(Operator operator);
	public void updateOperator(Operator operator);
	public Operator findOperatorByOpUserName(String opUserName);
	List<Room> findReservedRooms();
}
