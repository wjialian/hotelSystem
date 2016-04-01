package com.hotelmaster.home.web.login;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;


/**
 * Class description goes here.
 * 
 * @author FoGhost
 * @Date Mar 21, 2008
 */
public class UserLoginController extends MultiActionController{
	/** Logger for this class and subclasses */
    protected final Logger logger = Logger.getLogger(UserLoginController.class);
    
	public ModelAndView init (HttpServletRequest request,HttpServletResponse response) throws Exception{
		return new ModelAndView("userLogin");
		//return null;
	}
	
	public ModelAndView userLogin(HttpServletRequest request,HttpServletResponse response)throws Exception{
		String userID=(String) request.getParameter("userID").trim();
		String userPass=(String) request.getParameter("userPass").trim();
		if(userID.equals("admin")&& userPass.equals("admin") ){
		//return new ModelAndView("login");
			request.getSession().setAttribute("user", "admin");
			response.getWriter().write("{success: true}");
			return null;
		}else{
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().write("{success: false,errors:{ reason: '用户名密码错误' }}");
			return null;
		}
	}
}