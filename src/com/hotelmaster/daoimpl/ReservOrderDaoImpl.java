package com.hotelmaster.daoimpl;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

import com.hotelmaster.dao.ReservOrderDao;
import com.hotelmaster.po.CheckinItem;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.ReservItem;
import com.hotelmaster.po.ReservOrder;

public class ReservOrderDaoImpl extends GenericHibernateDao<ReservOrder> implements ReservOrderDao{

	public ReservOrderDaoImpl() {
		super(ReservOrder.class);
		// TODO Auto-generated constructor stub
	}

	public boolean create(ReservOrder reservOrder,
			List<ReservItem> reservItemList) {
		hibernateTemplate.save(reservOrder);
		for(ReservItem item : reservItemList){
			/*int rmState=item.getRoom().getRmState();
			if(rmState==item.getRoom().STATE_VACANT){
				item.getRoom().setRmState(item.getRoom().STATE_RENTED);
			}else{
				return false;
			}*/
			//item.getRoom().setRmState(1);		//更改房态-> 每天更新
			//hibernateTemplate.update(item.getRoom());
			item.setReservOrder(reservOrder);
			item.setRimInDateTime(reservOrder.getRoInDateTime());
			item.setRimOutDateTime(reservOrder.getRoPreOutDateTime());
			item.setRimState(reservOrder.getRoReservState());
			hibernateTemplate.save(item);
		}
		return true;
	}

	public List<ReservOrder> findAvailReservOrders(Page page) {
		Calendar tCal = Calendar.getInstance();
		tCal.set(tCal.HOUR_OF_DAY, 0);
		tCal.set(tCal.MINUTE,0);
		tCal.set(tCal.SECOND, 0);
		Timestamp curDate=new Timestamp(tCal.getTime().getTime());
		return queryForList(
				"select count(*)" +
				"from ReservOrder reservOrder where reservOrder.roReservState in ('预定中','已确认','1') " +
				"and reservOrder.roInDateTime>?"
				,"from ReservOrder reservOrder where reservOrder.roReservState in ('预定中','已确认','1') " +
				"and reservOrder.roInDateTime>?"
				,new Object[]{curDate}
				,page);
	}
	
	public List<ReservOrder> findReservByMrCodeId(String mrcodeid) {
		List<ReservOrder> reservOrderList=hibernateTemplate.find("from ReservOrder reservOrder where reservOrder.roOrderId=?",mrcodeid);
		return reservOrderList;
	}
	
	public List<ReservOrder> findTodayReservOrders() {
		Calendar tCal = Calendar.getInstance();
		tCal.set(tCal.HOUR_OF_DAY, 12);
		tCal.set(tCal.MINUTE,0);
		tCal.set(tCal.SECOND, 0);
		Timestamp curDate=new Timestamp(tCal.getTime().getTime());
		return hibernateTemplate.find("from ReservOrder reservOrder where " +
				"reservOrder.roInDateTime=?",curDate);
	}

	public List<ReservItem> findReservItemByOrder(ReservOrder reservOrder) {
		List<ReservItem> reservItemList=hibernateTemplate.find("from ReservItem reservItem where reservItem.reservOrder=?"
				,new Object[]{reservOrder});
		return reservItemList;
	}
	//删除 1:n
	public void deleteReservOrder(ReservOrder reservOrder,
			List<ReservItem> reservItemList) {
		//添加异常处理->预定中的和已确定的预定不能删除，得为失效或已光临状态
		/*for(ReservItem item:reservItemList){
			hibernateTemplate.delete(item);
		}*/
		for(ReservItem item:reservOrder.getReservItems()){
			hibernateTemplate.delete(item);
		}
		hibernateTemplate.delete(reservOrder);
	}
	//更新 1:n
	public void updateReservOrder(ReservOrder reservOrder,
			List<ReservItem> reservItemList) {
		/*hibernateTemplate.saveOrUpdate(reservOrder);
		for(ReservItem item:reservOrder.getReservItems()){
			hibernateTemplate.delete(item);
		}
		reservOrder.getReservItems().clear();*/
		//reservOrder=query(reservOrder.getRoId());
		for(ReservItem item:reservOrder.getReservItems()){
			hibernateTemplate.delete(item);
		}
		reservOrder.getReservItems().clear();
		for(ReservItem item:reservItemList){
			item.setReservOrder(reservOrder);
			item.setRimInDateTime(reservOrder.getRoInDateTime());
			item.setRimOutDateTime(reservOrder.getRoPreOutDateTime());
			item.setRimState(reservOrder.getRoReservState());
		}
		reservOrder.setReservItems(reservItemList);
		hibernateTemplate.update(reservOrder);
	}

	public void deleteRerservOrderItem(String roId) {
		// TODO Auto-generated method stub
		ReservOrder reservOrder=query(roId);
		for(ReservItem item:reservOrder.getReservItems()){
			hibernateTemplate.delete(reservOrder);
		}
		//reservOrder.getReservItems().clear();
		//hibernateTemplate.update(reservOrder);
	}

	public ReservOrder findReservOrderByRmId(String rmId) {
		List<ReservItem> reservItemList=hibernateTemplate.find("from ReservItem as item where item.room.rmId=? " +
				"and item.rimState in ('预定中','已确认','1') order by item.rimInDateTime desc",rmId);
		if(reservItemList.size()>0){
			ReservItem reservItem=reservItemList.get(0);
			return reservItem.getReservOrder();
		}else{
			return null;
		}
	}
	
}
