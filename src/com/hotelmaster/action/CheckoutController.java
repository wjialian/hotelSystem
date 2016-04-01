package com.hotelmaster.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.home.web.util.BalancementUtil;
import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.GuestHistory;
import com.hotelmaster.service.BusinessService;

public class CheckoutController extends MultiActionController{
	private final static Logger log = Logger.getLogger(CheckinController.class);
	private BusinessService businessService;
	
	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return null;
	}
	/**
	 * 
	 * 生成结账单信息 更新登记单 客史资料
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView checkout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8"); 				//设置请求编码格式
		response.setContentType("text/json;charset=utf-8"); //设置响应文本格式
		String cioGuestCardId = null;						//客户证件号码
		if(request.getParameter("cioGuestCardId")!=null){	//判断客户证件号码是否为空
			cioGuestCardId=(String)request.
					getParameter("cioGuestCardId").trim();	//获得客户证件号码
		}
		Guest guest = businessService.
						findGuestByGtCardId(cioGuestCardId);//查找客户信息
		String gtId = guest.getGtId();						//获得客户编号	
		Balancement balancement=BalancementUtil.
							createBalancement(request,gtId);//设置结账信息
		String bmId = businessService.
						createBalancement(balancement);		//保存结账信息
		GuestHistory guestHistroy = BalancementUtil.
						createGuestHistory(request,bmId,gtId);//设置客户记录信息
		businessService.createGuestHistory(guestHistroy);	//保存客户记录信息
        response.getWriter().write("{success: true}");		//输出成功信息
		return null;
	}
	public BusinessService getBusinessService() {
		return businessService;
	}

	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
	
}
