package com.hotelmaster.home.web.util;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;

import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.GuestHistory;

public class BalancementUtil {
	private String bmId;	//PkId
	private String bmCheckinOrderId;	
	private String bmGuestId;	//客人Id
	private String bmType;		
	private BigDecimal bmTotalRate;	
	private BigDecimal bmPaidMoney;	
	private BigDecimal bmReceivMoney;	
	private Timestamp bmCreateTime;	//创建时间
	private String bmOperator;	
	private String bmPaymentModel;	
	private String bmRemark;	
	
	public static Balancement createBalancement(HttpServletRequest request,String gtId)
		throws Exception{
		Balancement balancement=new Balancement();
		/*cioId=402881e41a1e00d6011a1e0c03df0002
		 * &bmOperator=FoGhost&bmOrderId=CIO00000001
		 * &bmPaymentModel=%E7%8E%B0%E9%87%91
		 * &bmPaidMoney=0&bmReceivMoeny=0
		 * &bmType=%E7%BB%93%E5%8D%95
		 * &bmTotalRate=320
		 * &bmRemain=0&bmRemark=*/
		if(request.getParameter("bmPaymentModel")!=null){	//支付类型
			String bmPaymentModel=(String) request.getParameter("bmPaymentModel").trim();
			balancement.setBmPaymentModel(bmPaymentModel);
		}
		if(request.getParameter("bmPaidMoney")!=null){	//已付押金
			String bmPaidMoney=(String) request.getParameter("bmPaidMoney").trim();
			balancement.setBmPaidMoney(new BigDecimal(bmPaidMoney));
		}
		if(request.getParameter("bmReceivMoeny")!=null){	//续收金额
			String bmReceivMoeny=(String) request.getParameter("bmReceivMoeny").trim();
			balancement.setBmReceivMoney(new BigDecimal(bmReceivMoeny));
		}
		if(request.getParameter("bmType")!=null){	//结账类型->结单/挂单/跑单/其他
			String bmType=(String) request.getParameter("bmType").trim();
			balancement.setBmType(bmType);
		}
		if(request.getParameter("bmTotalRate")!=null){	//应收金额
			String bmTotalRate=(String) request.getParameter("bmTotalRate").trim();
			balancement.setBmTotalRate(new BigDecimal(bmTotalRate));
		}
		if(request.getParameter("bmRemark")!=null){	//结账说明
			String bmRemark=(String) request.getParameter("bmRemark").trim();
			balancement.setBmRemark(bmRemark);
		}
		if(request.getParameter("bmOperator")!=null){	//营业员
			String bmOperator=(String) request.getParameter("bmOperator").trim();
			balancement.setBmOperator(bmOperator);
		}
		if(request.getParameter("cioId")!=null){	//登记单PKId
			String bmCheckinOrderId=(String) request.getParameter("cioId").trim();
			balancement.setBmCheckinOrderId(bmCheckinOrderId);
		}
		balancement.setBmGuestId(gtId);
		return balancement;
	}
	public static GuestHistory createGuestHistory(HttpServletRequest request,String bmId,String gtId)
	throws Exception{
		GuestHistory guestHistory = new GuestHistory();
		if(request.getParameter("cioGuestName")!=null){	//用户姓名
			String cioGuestName=(String) request.getParameter("cioGuestName").trim();
			guestHistory.setGhGuestName(cioGuestName);
		}
		if(request.getParameter("bmRemark")!=null){	//结账说明
			String bmRemark=(String) request.getParameter("bmRemark").trim();
			guestHistory.setGhRemark(bmRemark);
		}
		guestHistory.setGhBalancementId(bmId);
		guestHistory.setGhGuestId(gtId);
		return guestHistory;
	}
}
