package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.Page;
import com.hotelmaster.po.ReservItem;
import com.hotelmaster.po.ReservOrder;

public interface ReservOrderDao extends GenericDao<ReservOrder>{
	boolean create(ReservOrder reservOrder,
			List<ReservItem> reservItemList);
	List<ReservOrder> findAvailReservOrders(Page page);
	List<ReservOrder> findTodayReservOrders();
	List<ReservItem> findReservItemByOrder(ReservOrder reservOrder);
	ReservOrder findReservOrderByRmId(String rmId);
	void deleteReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList);
	void updateReservOrder(ReservOrder reservOrder,List<ReservItem> reservItemList);
	void deleteRerservOrderItem(String roId);
	public List<ReservOrder> findReservByMrCodeId(String mrcodeid) ;
}
