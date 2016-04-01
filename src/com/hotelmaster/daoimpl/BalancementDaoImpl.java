package com.hotelmaster.daoimpl;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

import com.hotelmaster.dao.BalancementDao;
import com.hotelmaster.po.Balancement;

public class BalancementDaoImpl extends GenericHibernateDao<Balancement> implements BalancementDao{
	public BalancementDaoImpl() {
		super(Balancement.class);
	}
	/**
	 * 创建结账信息
	 */
	public String createBalancement(Balancement balancement) {
		Calendar tCal = Calendar.getInstance();//获得日期类实例对象
		Timestamp curDate=new Timestamp
					(tCal.getTime().getTime());//获得系统当前时间
		balancement.setBmCreateTime(curDate);//设置结账时间
		String checkinOrderId = 
			balancement.getBmCheckinOrderId();//获得入住登记订单编号
		hibernateTemplate.save(balancement);//保存结账信息
		List<Balancement> balancementList = hibernateTemplate
		.find("from Balancement where bmCheckinOrderId = '"
						+checkinOrderId+"'");//查找结账信息列表
		return balancementList.get(0).getBmId();//返回结账信息编号
	}
	
	public Balancement findBalancementInformationByBmId(String bmId) {
		List<Balancement> balancement = hibernateTemplate.find("from Balancement where bmId='"+bmId+"'");
		return balancement.get(0);
	}
	
}
