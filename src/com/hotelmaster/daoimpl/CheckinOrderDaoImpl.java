package com.hotelmaster.daoimpl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hotelmaster.dao.CheckinOrderDao;
import com.hotelmaster.po.CheckinItem;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Room;

public class CheckinOrderDaoImpl extends GenericHibernateDao<CheckinOrder> implements CheckinOrderDao{

	public CheckinOrderDaoImpl() {
		super(CheckinOrder.class);
	}
	//refactory code
	public Map<String,String> calculateAccommodationByQuarter(String year) throws ParseException {
		// TODO Auto-generated method stub
		Map<String,String> map = new HashMap<String,String>();
		String start =null;
		String end = null;
		java.sql.Timestamp starttime;
		java.sql.Timestamp endtime;
		SimpleDateFormat sdf;
		java.util.Date date;
		for(int i = 1;i<=4;i++){
			switch(i){
			case 1:
				start = String.format("%s-%d-1 00:00:00.000",year,1);
				end = String.format("%s-%d-1 00:00:00.000",year,4);
				sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
				date = sdf.parse(start);
				starttime = new java.sql.Timestamp(date.getTime());
				date = sdf.parse(end);
				endtime = new java.sql.Timestamp(date.getTime());
				map.put("spring",String.valueOf(queryForObject(
						"select count(*) from CheckinOrder where cioInDateTime>? and cioInDateTime<?"
						,new Object[] {starttime,endtime})));
				break;
			case 2:
				start = String.format("%s-%d-1 00:00:00.000",year,4);
				end = String.format("%s-%d-1 00:00:00.000",year,7);
				sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
				date = sdf.parse(start);
				starttime = new java.sql.Timestamp(date.getTime());
				date = sdf.parse(end);
				endtime = new java.sql.Timestamp(date.getTime());
				map.put("summer",String.valueOf(queryForObject(
						"select count(*) from CheckinOrder where cioInDateTime>? and cioInDateTime<?"
						,new Object[] {starttime,endtime})));
				break;
			case 3:
				start = String.format("%s-%d-1 00:00:00.000",year,7);
				end = String.format("%s-%d-1 00:00:00.000",year,10);
				sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
				date = sdf.parse(start);
				starttime = new java.sql.Timestamp(date.getTime());
				date = sdf.parse(end);
				endtime = new java.sql.Timestamp(date.getTime());
				map.put("autumn",String.valueOf(queryForObject(
						"select count(*) from CheckinOrder where cioInDateTime>? and cioInDateTime<?"
						,new Object[] {starttime,endtime})));
				break;
			case 4:
				start = String.format("%s-%d-1 00:00:00.000",year,10);
				end = String.format("%s-%d-31 00:00:00.000",year,12);
				sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
				date = sdf.parse(start);
				starttime = new java.sql.Timestamp(date.getTime());
				date = sdf.parse(end);
				endtime = new java.sql.Timestamp(date.getTime());
				map.put("winter",String.valueOf(queryForObject(
						"select count(*) from CheckinOrder where cioInDateTime>? and cioInDateTime<?"
						,new Object[] {starttime,endtime})));
				break;
			}
			
		}
		return map;
	}

	public boolean createCheckinItem(CheckinOrder checkinOrder, Room room,
			BigDecimal prctPrice, BigDecimal discount) {
		Long count=(Long)queryForObject(
				"select count(*) from CheckinItem as cim where cim.checkinOrder=? and cim.room=?"
				,new Object[] {checkinOrder,room});
		if(count.longValue()==0)
		{
			CheckinItem checkinItem=new CheckinItem();
			checkinItem.setCheckinOrder(checkinOrder);
			checkinItem.setRoom(room);
			checkinItem.setCimPrctPrice(prctPrice);
			checkinItem.setCimDiscount(discount);
			checkinItem.setCimInDatetime(checkinOrder.getCioInDateTime());
			checkinItem.setCimOutDatetime(checkinOrder.getCioPrctOutDateTime());
			hibernateTemplate.save(checkinItem);
			return true;
		}
		return false;
	}

	public boolean create(CheckinOrder checkinOrder, //创建登记信息
			List<CheckinItem> checkinItemList) {
		hibernateTemplate.save(checkinOrder);		//保存入住登记订单信息
		for(CheckinItem item : checkinItemList){	//遍历入住登记信息列表
			item.getRoom().setRmState(2);			//设置房间状态为已租用
			hibernateTemplate.update(item.getRoom());//更新房间状态
			item.setCheckinOrder(checkinOrder);		//设置入住登记订单信息
			item.setCimState(checkinOrder.getCioState());//设置登记状态
			item.setCimInDatetime(checkinOrder.
								getCioInDateTime());//设置入住时间
			item.setCimOutDatetime(checkinOrder.
							getCioPreOutDateTime());//设置离开时间
			hibernateTemplate.save(item);			//保存注入登记信息
		}
		return true;
	}

	public CheckinOrder findCheckinOrderByCioOrderId(String cioOrderId) {
		List checkinOrder= hibernateTemplate.find("from CheckinOrder where cioOrderId='"+cioOrderId+"'");
		return (CheckinOrder)checkinOrder.get(0);
	}

	public CheckinOrder findCheckinOrderByCioId(String cioId) {
		List checkinOrder= hibernateTemplate.find("from CheckinOrder where cioId='"+cioId+"'");
		return (CheckinOrder)checkinOrder.get(0);
	}
	
	public CheckinOrder findCheckinOrderByRmId(String rmId) {
		List<CheckinItem> checkinItemList=hibernateTemplate.find("from CheckinItem as item where item.room.rmId=? " +
				"and item.cimState='已入住' order by item.cimInDatetime desc",rmId);
		//异常处理
		if(checkinItemList.size()>0){
			CheckinItem checkinItem=checkinItemList.get(0);
			return checkinItem.getCheckinOrder();
		}else{
			return null;
		}
	}

	public void updateAfterCheckout(CheckinOrder checkinOrder) {
		checkinOrder.setCioState("已结账");
		Calendar tCal = Calendar.getInstance();
		Timestamp curDate=new Timestamp(tCal.getTime().getTime());
		checkinOrder.setCioPrctOutDateTime(curDate);
		List<CheckinItem> checkinItemList=checkinOrder.getCheckinItems();
		for(CheckinItem item:checkinItemList){
			item.setCimState("已结账");
			item.getRoom().setRmState(3);
			hibernateTemplate.update(item.getRoom());
		}
		//房态更新
		hibernateTemplate.update(checkinOrder);
	}
	public CheckinOrder findCheckinOrderDao(String cioId) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
