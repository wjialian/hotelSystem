package com.hotelmaster.home.web.util;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import com.hotelmaster.po.CheckinOrder;

/**
 * CheckinOrderUtil
 * 
 * @
 * @Date Apr 25, 2008
 */
public class CheckinOrderUtil {
	
	private String cioId;				//uupkid
	private String cioGroupName;		//团队名称(协议单位)
	private String cioCause;			//事由(备用)
	private Integer cioState;			//登记状态
	private Timestamp cioPrctOutDateTime;//实际离开时间(结帐时间)
	private String cioIsReservId;		//有无预定(有则填预定号)	

	public static CheckinOrder createCheckinOrder(HttpServletRequest request
						)throws Exception{
		CheckinOrder checkinOrder=new CheckinOrder();
		if(request.getParameter("cioInDateTime")!=null){	//客人入住时间
			String cioInDateTime=(String) request.getParameter("cioInDateTime").trim();
			checkinOrder.setCioInDateTime(Timestamp.valueOf(cioInDateTime));
		}
		if(request.getParameter("cioPreOutDateTime")!=null){ //预计离开时间
			String preOutDateTimeString=(String) request.getParameter("cioPreOutDateTime").trim();
			System.out.println(preOutDateTimeString);
			Timestamp cioPreOutDateTime=Timestamp.valueOf(preOutDateTimeString);
			checkinOrder.setCioPreOutDateTime(cioPreOutDateTime);
		}
		if(request.getParameter("cioPrctOutDateTime")!=null){	//实际离开时间 未结帐时等于预计离开时间
			String cioPrctOutDateTime=(String) request.getParameter("cioPrctOutDateTime").trim();
			checkinOrder.setCioPrctOutDateTime(Timestamp.valueOf(cioPrctOutDateTime));
		}else{
			checkinOrder.setCioPrctOutDateTime(checkinOrder.getCioPreOutDateTime());
		}
		if(request.getParameter("cioGuestType").trim()!=null){ //客人类型(Vip,协议单位)
			String cioGuestType=(String) request.getParameter("cioGuestType").trim();
			checkinOrder.setCioGuestType(cioGuestType);
		}
		if(request.getParameter("cioManNumber")!=null){	//人数
			String cioManNumber=(String) request.getParameter("cioManNumber").trim();
			checkinOrder.setCioManNumber(Integer.parseInt(cioManNumber));
		}
		/*if(request.getParameter("cioInDateTime-date")!=null){	
			String intimedate=(String) request.getParameter("cioInDateTime-date").trim();
		}
		if(request.getParameter("cioInDateTime-time")!=null){
			String intimetime=(String) request.getParameter("cioInDateTime-time").trim();
		}
		if(request.getParameter("cioPreOutDateTime-date")!=null){
			String preOutDateTimedate=(String) request.getParameter("cioPreOutDateTime-date").trim();
		}
		if(request.getParameter("cioPreOutDateTime-time")!=null){
			String preOutDateTimetime=(String) request.getParameter("cioPreOutDateTime-time").trim();
		}*/
		if(request.getParameter("cioGuestName")!=null){	//客人名称
			String cioGuestName=(String) request.getParameter("cioGuestName").trim();
			checkinOrder.setCioGuestName(cioGuestName);
		}
		if(request.getParameter("cioGuestGender")!=null){	//客人性别
			String cioGuestGender=(String) request.getParameter("cioGuestGender").trim();
			checkinOrder.setCioGuestGender(cioGuestGender);
		}
		if(request.getParameter("cioGuestCardId")!=null){	//客人证件号码
			String cioGuestCardId=(String) request.getParameter("cioGuestCardId").trim();
			checkinOrder.setCioGuestCardId(cioGuestCardId);
		}
		if(request.getParameter("cioGuestCardCatalog")!=null){	//客人证件类别
			String cioGuestCardCatalog=(String) request.getParameter("cioGuestCardCatalog").trim();
			checkinOrder.setCioGuestCardCatalog(cioGuestCardCatalog);
		}
		/*if(request.getParameter("guestCatalog")!=null){		//客人类别(散客,团队...)//散客登记未用
			String guestCatalog=(String) request.getParameter("guestCatalog").trim();
			checkinOrder.setCioGuestCatalog(guestCatalog);
		}*/
	
		if(request.getParameter("cioPaymentModel")!=null){	//支付类型
			String cioPaymentModel=(String) request.getParameter("cioPaymentModel").trim();
			checkinOrder.setCioPaymentModel(cioPaymentModel);
		}
		if(request.getParameter("cioPaidMoney")!=null){	//已付押金
			String cioPaidMoney=(String) request.getParameter("cioPaidMoney").trim();
			checkinOrder.setCioPaidMoney(new BigDecimal(cioPaidMoney));
		}
		if(request.getParameter("cioTotalRate")!=null){
			String cioTotalRate=(String) request.getParameter("cioTotalRate").trim();
			checkinOrder.setCioTotalRate(new BigDecimal(cioTotalRate));
		}
		if(request.getParameter("cioBedRate")!=null){		//加床费
			String cioBedRate=(String) request.getParameter("cioBedRate").trim();
			checkinOrder.setCioBedRate(new BigDecimal(cioBedRate));
		}
		if(request.getParameter("cioOperator")!=null){		//操作员(username)
			String cioOperator=(String) request.getParameter("cioOperator").trim();
			checkinOrder.setCioOperator(cioOperator);
		}else{
			checkinOrder.setCioOperator("Admin");		//加入验证机制后从前台设置
		}
		if(request.getParameter("cioOrderId")!=null){		//登记单号
			String cioOrderId=(String) request.getParameter("cioOrderId").trim();
			checkinOrder.setCioOrderId(cioOrderId);
		}else{
			checkinOrder.setCioOrderId("CIO00000001");			//配置基本信息后自动生成
		}
		return checkinOrder;
	}

}
