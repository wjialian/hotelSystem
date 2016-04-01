package com.hotelmaster.dao;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.hotelmaster.po.CheckinItem;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.Room;

public interface CheckinOrderDao extends GenericDao<CheckinOrder>{
	boolean createCheckinItem(CheckinOrder checkinOrder,
				Room room,BigDecimal prctPrice,BigDecimal discount);
	boolean create(CheckinOrder checkinOrder,
			List<CheckinItem> checkinItemList);
	CheckinOrder findCheckinOrderDao(String cioId);
	CheckinOrder findCheckinOrderByRmId(String rmId);
	CheckinOrder findCheckinOrderByCioId(String cioId);
	void updateAfterCheckout(CheckinOrder checkinOrder);
	public Map<String,String> calculateAccommodationByQuarter(String year) throws ParseException;
	public CheckinOrder findCheckinOrderByCioOrderId(String cioOrderId);
}
