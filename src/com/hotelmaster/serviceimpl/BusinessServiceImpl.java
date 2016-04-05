package com.hotelmaster.serviceimpl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.hotelmaster.dao.BalancementDao;
import com.hotelmaster.dao.BaseInfoDao;
import com.hotelmaster.dao.CheckinOrderDao;
import com.hotelmaster.dao.DemandDao;
import com.hotelmaster.dao.FloorDao;
import com.hotelmaster.dao.GuestDao;
import com.hotelmaster.dao.GuestHistoryDao;
import com.hotelmaster.dao.OperatorDao;
import com.hotelmaster.dao.ReservOrderDao;
import com.hotelmaster.dao.RoomCatalogDao;
import com.hotelmaster.dao.RoomDao;
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
import com.hotelmaster.service.BusinessService;

/**
 * Class description goes here.
 * 
 * @
 * @Date Apr 19, 2008
 */
public class BusinessServiceImpl implements BusinessService{
	
	private RoomDao roomDao;
	private RoomCatalogDao roomCatalogDao;
	private CheckinOrderDao checkinOrderDao;
	private ReservOrderDao reservOrderDao;
	private OperatorDao operatorDao;
	private GuestDao guestDao;	
	private GuestHistoryDao guestHistoryDao;
	private BalancementDao balancementDao;
	private FloorDao floorDao;
	private DemandDao demandDao;
    
	
	public long calculateGuestsByMonth(Timestamp start, Timestamp end) {
		// TODO Auto-generated method stub
		return guestDao.calculateGuestsByMonth(start, end);
	}

	public Map<String, String> calculateAccommodationByQuarter(String year)
			throws ParseException {
		// TODO Auto-generated method stub
		return checkinOrderDao.calculateAccommodationByQuarter(year);
	}

	/*public void createBalancement(Balancement balancement) {
		// TODO Auto-generated method stub
		return null;
	}*/

	/********************************************************/
	private BaseInfoDao baseInfoDao;
    
	public List<GuestHistory> findAllGuestHistory(Page page) {
		// TODO Auto-generated method stub
		return guestHistoryDao.findAll(page);
	}


	public void createGuestHistory(GuestHistory guestHistory) {
		// TODO Auto-generated method stub
		guestHistoryDao.createGuestHistory(guestHistory);
	}


	public CheckinOrder findCheckinOrderByCioOrderId(String cioOrderId) {
		// TODO Auto-generated method stub
		return checkinOrderDao.findCheckinOrderByCioOrderId(cioOrderId);
	}


	public CheckinOrder findCheckinOrderByCioId(String cioId) {
		// TODO Auto-generated method stub
		return checkinOrderDao.findCheckinOrderByCioId(cioId);
	}


	public List<Balancement> queryHistoryInformation(Page page, String gtId) {
		// TODO Auto-generated method stub
		return guestHistoryDao.queryHistoryBalancement(page, gtId);
	}


	public Balancement findBalancementInformationByBmId(String bmId) {
		// TODO Auto-generated method stub
		return balancementDao.findBalancementInformationByBmId(bmId);
	}


	public long getHistoryTotalCount(String gtId) {
		// TODO Auto-generated method stub
		return guestHistoryDao.getHistoryTotalCount(gtId);
	}


	public boolean updateHistoryInfo(GuestHistory guestHistory) {
		// TODO Auto-generated method stub
		return guestHistoryDao.updateHistoryInfo(guestHistory);
	}


	public GuestHistory queryHistoryInfo(String gtId) {
		// TODO Auto-generated method stub
		return guestHistoryDao.queryHistoryInfo(gtId);
	}


	/*****************************************/
	public boolean updateGuest(Guest guest) {
		// TODO Auto-generated method stub
		return guestDao.updateGuest(guest);
	}
	
	public Guest queryGuestInfo(String value, JSONArray fields) {
		// TODO Auto-generated method stub
		return guestDao.queryGuestInfo(value, fields);
	}

	public Guest findGuestByGtCardId(String gtCardId) {
		// TODO Auto-generated method stub
		return guestDao.findGuestByGtCardId(gtCardId);
	}


	public List<Guest> findAllGuests(Page page){
		
		return guestDao.findAll(page);
	}
	
	public long getGuestTotalCount() {
		// TODO Auto-generated method stub
		return guestDao.getGuestTotalCount();
	}
	
	public boolean addNewGuest(Guest guest) {	//新增客户信息
		return guestDao.addNewGuest(guest);
	}
	
	public boolean delGuest(Guest guest) {
		// TODO Auto-generated method stub
		return guestDao.delGuest(guest);
	}

	public Guest findGuestByGtId(String gtId) {
		// TODO Auto-generated method stub
		return guestDao.findGuestByGtId(gtId);
	}
	/**
	 * 由房间ID查找房间信息
	 */
	public Room findRoomById(String rmId) {
		// TODO Auto-generated method stub
		return roomDao.query(rmId);
	}
	
	public boolean addNewRoom(Room room) {
		// TODO Auto-generated method stub
		return roomDao.addNewRoom(room);
	}

	public boolean deleteRoom(Room room) {
		// TODO Auto-generated method stub
		return roomDao.deleteRoom(room);
	}
	
	public Long queryRoomCount() {
		// TODO Auto-generated method stub
		return roomDao.queryRoomCount();
	}

	/**
	 * 查询所有房间信息
	 */
	public List<Room> findAllRooms(Page page) {//查询所有房间信息
		return roomDao.findAll(page);
	}
	/**
	 * 查询可供预定的房间信息(bg)
	 */
	public List<Room> findAvailReservRooms(Timestamp fromDate,Timestamp toDate
			,String rmCatalog,Page page){
		return roomDao.findAvailReserv(fromDate,toDate,rmCatalog,page);
	}
	/**
	 * 更新房间信息
	 */
	public void updateRoom(Room room) {
		// TODO Auto-generated method stub
	    roomDao.update(room);
	}
	/**
	 * 由用户名查找操作员信息
	 */
	public Operator findOperatorByUserId(String opUserName) {
		return operatorDao.query(opUserName);
	}
	/**
	 * 创建登记信息
	 */
	public boolean createCheckinOrder(CheckinOrder checkinOrder,List<CheckinItem> checkinItemList) {
		return checkinOrderDao.create(checkinOrder,checkinItemList);
	}
	/**
	 * 由房间名查找最近的登记信息(ubg)
	 */
	public CheckinOrder findCheckinOrderByRmId(String rmId) {
		return checkinOrderDao.findCheckinOrderByRmId(rmId);
	}
	/**
	 * 创建预定信息
	 */
	public boolean createReservOrder(ReservOrder reservOrder,
			List<ReservItem> reservItemList) {
		//return false;
		return reservOrderDao.create(reservOrder, reservItemList);
	}
	/**
	 * 查找有效预定信息
	 */
	public List<ReservOrder> findAvailReservOrders(Page page) {
		return reservOrderDao.findAvailReservOrders(page);
	}
	/**
	 * 查找当天预定信息
	 */
	public List<ReservOrder> findTodayReservOrders() {
		return reservOrderDao.findTodayReservOrders();
	}

	/**
	 * 由预定单PKId查找对应的预定信息
	 */
	public ReservOrder findReservById(String roId) {
		return reservOrderDao.query(roId);
	}
	
	/**
	 * 根据码团订单查询酒店订单
	 */
	public List<ReservOrder> findReservByMrCodeId(String mrcodeid) {
		return reservOrderDao.findReservByMrCodeId(mrcodeid);
	}
	/**
	 * 查找预定单对应的预定项信息
	 */
	public List<ReservItem> findReservItemByOrder(ReservOrder reservOrder) {
		return reservOrderDao.findReservItemByOrder(reservOrder);
	}

	public ReservOrder findReservOrderByRmId(String rmId) {
		return reservOrderDao.findReservOrderByRmId(rmId);
	}

	/**
	 * 删除预定单对应预定项
	 */
	public void deleteReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList) {
		reservOrderDao.deleteReservOrder(reservOrder,reservItemList);
	}
	/**
	 * 
	 * 更新预定单 预定单项
	 *
	 * @param reservOrder	预定单信息
	 * @param reservItemList	预定项信息
	 * 
	 */
	public void updateReservOrder(ReservOrder reservOrder,
			List<ReservItem> reservItemList) {
		reservOrderDao.updateReservOrder(reservOrder,reservItemList);
	}
	/**
	 * 删除预定单中的预定项
	 */
	public void deleteReservOrderItem(String roId) {
		reservOrderDao.deleteRerservOrderItem(roId);
	}
	
	/*public String createBalancement(Balancement balancement) {
		String bmId = balancementDao.createBalancement(balancement);*/
	/**
	 * 结账
	 */
public String createBalancement(Balancement balancement) {
	String bmId = balancementDao.
					createBalancement(balancement);//创建结账信息
	String cioId=balancement.getBmCheckinOrderId();//获得入住登记订单编号
	CheckinOrder checkinOrder=
					checkinOrderDao.query(cioId);//查找入住登记信息
	checkinOrder.setCioTotalRate
					(balancement.getBmTotalRate());//设置总费用
	checkinOrderDao.updateAfterCheckout(checkinOrder);//更新入住登记订单
	return bmId;//返回结账信息编号
}
	/**
	 * 由基本信息名称 查找基本信息值
	 */
	public BaseInfo findBaseInfoByName(String bioName) {
		return baseInfoDao.findValueByName(bioName);
	}
	/**
	 * 更新基本信息
	 */
	public void updateBaseInfoCioOrder(BaseInfo baseInfo) {
		baseInfoDao.update(baseInfo);
	}
	
	/**
	 * 查找房间状态为已预定的房间
	 */
	public List<Room> findReservedRooms() {
		// TODO Auto-generated method stub
		return roomDao.findReservedRoom();
	}

	public List<RoomCatalog> showAllRoomCatalog() {//显示所有的客房类型
		return roomCatalogDao.showAllRoomCatalog();
	}
	
	public void updateRoomCatalog(RoomCatalog roomCatalog) {//更新客房类型
		roomCatalogDao.update(roomCatalog);
	}
	
	public boolean addNewRoomCatalog(RoomCatalog roomCatalog) {//新增客房类型
		return roomCatalogDao.addNewRoomCatalog(roomCatalog);
	}
	
	public boolean delRoomCatalog(RoomCatalog roomCatalog) {//删除客房类型
		return roomCatalogDao.delRoomCatalog(roomCatalog);
	}
	public List<Floor> showAllFloor() {//显示所有的客房类型
		return floorDao.showAllFloor();
	}
	
	public void updateFloor(Floor floor) {//更新客房类型
		floorDao.update(floor);
	}
	
	public boolean addNewFloor(Floor floor) {//新增客房类型
		return floorDao.addNewFloor(floor);
	}
	
	public boolean delFloor(Floor floor) {//删除客房类型
		return floorDao.delFloor(floor);
	}
	public List<Demand> showAllDemand() {//显示所有的客房类型
		return demandDao.showAllDemand();
	}	
	public boolean addNewDemand(Demand demand) {//新增客房类型
		return demandDao.addNewDemand(demand);
	}
	
	public boolean delDemand(Demand demand) {//删除客房类型
		return demandDao.delDemand(demand);
	}
/******************************************************/
	public List<Operator> showAllOperators() {
		// TODO Auto-generated method stub
		return operatorDao.showAllOperators();
	}
   
	public boolean addNewOperator(Operator operator) {
		// TODO Auto-generated method stub
		return operatorDao.addNewOperator(operator);
	}

	public boolean deleteOperator(Operator operator) {
		// TODO Auto-generated method stub
		return operatorDao.deleteOperator(operator);
	}
	

	public void updateOperator(Operator operator) {
		// TODO Auto-generated method stub
		operatorDao.update(operator);
	}

	public Operator findOperatorByOpUserName(String opUserName) {
		// TODO Auto-generated method stub
		return operatorDao.findOperatorByOpUserName(opUserName);
	}

/**************************************************/
	public OperatorDao getOperatorDao() {
		return operatorDao;
	}

	public void setOperatorDao(OperatorDao operatorDao) {
		this.operatorDao = operatorDao;
	}

	public CheckinOrderDao getCheckinOrderDao() {
		return checkinOrderDao;
	}
	public void setCheckinOrderDao(CheckinOrderDao checkinOrderDao) {
		this.checkinOrderDao = checkinOrderDao;
	}
	
	public RoomDao getRoomDao() {
		return roomDao;
	}
	
	public void setRoomDao(RoomDao roomDao) {
		this.roomDao = roomDao;
	}

	public ReservOrderDao getReservOrderDao() {
		return reservOrderDao;
	}

	public void setReservOrderDao(ReservOrderDao reservOrderDao) {
		this.reservOrderDao = reservOrderDao;
	}
	
	public GuestDao getGuestDao() {
		return guestDao;
	}

	public void setGuestDao(GuestDao guestDao) {
		this.guestDao = guestDao;
	}

	public GuestHistoryDao getGuestHistoryDao() {
		return guestHistoryDao;
	}

	public void setGuestHistoryDao(GuestHistoryDao guestHistoryDao) {
		this.guestHistoryDao = guestHistoryDao;
	}

	public BalancementDao getBalancementDao() {
		return balancementDao;
	}

	public void setBalancementDao(BalancementDao balancementDao) {
		this.balancementDao = balancementDao;
	}

	public BaseInfoDao getBaseInfoDao() {
		return baseInfoDao;
	}

	public void setBaseInfoDao(BaseInfoDao baseInfoDao) {
		this.baseInfoDao = baseInfoDao;
	}

	public RoomCatalogDao getRoomCatalogDao() {
		return roomCatalogDao;
	}

	public void setRoomCatalogDao(RoomCatalogDao roomCatalogDao) {
		this.roomCatalogDao = roomCatalogDao;
	}

	public FloorDao getFloorDao() {
		return floorDao;
	}

	public void setFloorDao(FloorDao floorDao) {
		this.floorDao = floorDao;
	}

	public DemandDao getDemandDao() {
		return demandDao;
	}

	public void setDemandDao(DemandDao demandDao) {
		this.demandDao = demandDao;
	}
	
}
