package com.hotelmaster.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.service.BusinessService;

import java.io.FileOutputStream;


public class BusinessCalculationController extends MultiActionController {
	private final static Logger log = Logger.getLogger(BusinessCalculationController.class);
	private BusinessService businessService;
	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// start to write something to the log
		log.info("Someone come from ip address <"
				+ request.getRemoteAddr() + ">");
		System.out.println("reach BusinessController");
		
		//roomInfo=businessService.findRoomDetails("8108");
		
		return new ModelAndView("business");
	}
	
	public void calucationGuestByMonth(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String year = null;
		if ((String) request.getParameter("year").trim() != null) {
			year = (String) request.getParameter("year").trim();
			log.info(year);
		} else {
			log.info("year is null");
			return;
		}
		for(int i = 1;i<=12;i++){
			
		}
	}
	
	public void calculateAccommodationByQuarter(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String year = null;
		if ((String) request.getParameter("year").trim() != null) {
			year = (String) request.getParameter("year").trim();
			log.info(year);
		} else {
			log.info("year is null");
			return;
		}
		Map<String,String> map = new HashMap<String,String>();
		map = businessService.calculateAccommodationByQuarter(year);
		log.info(map);
	
	}
	/***************************************************************/

	public BusinessService getBusinessService() {
		return businessService;
	}

	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
	
}
