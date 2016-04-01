package com.hotelmaster.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 * Class description goes here.
 * 
 * @author FoGhost
 * @Date Mar 22, 2008
 */
public class HomeController extends MultiActionController {
	// log file
	private final static Logger log = Logger.getLogger(HomeController.class);

	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// start to write something to the log
		log.info("Someone come from ip address <"
				+ request.getRemoteAddr() + ">");
		return new ModelAndView("home");
	}
}