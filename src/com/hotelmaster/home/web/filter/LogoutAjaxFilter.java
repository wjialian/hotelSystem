package com.hotelmaster.home.web.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class LogoutAjaxFilter extends OncePerRequestFilter {   
    
    protected void doFilterInternal(HttpServletRequest request,   
                                    HttpServletResponse response,    
                                    FilterChain filterChain) throws ServletException, IOException {   
    	System.out.println("reach logout acegiajaxfilter");
        if (!isAjaxRequest(request)) {   
            filterChain.doFilter(request, response);
            System.out.println("reach acegiajaxfilter not ajax");
            return;   
        }
        
        RedirectResponseWrapper redirectResponseWrapper = new RedirectResponseWrapper(response);   
    
        filterChain.doFilter(request, redirectResponseWrapper);   
        
        if (redirectResponseWrapper.getRedirect() != null) {   
        	
            request.setCharacterEncoding("UTF-8");   
            response.setContentType("text/json;charset=utf-8");   
    
            response.setHeader("Cache-Control", "no-cache");   
            response.setDateHeader("Expires", 0);   
            response.setHeader("Pragma", "no-cache");   

            String redirectURL = redirectResponseWrapper.getRedirect();   
            String content;
            if (redirectURL.indexOf("login_error=1") == -1) {   
            	response.getWriter().write("{success: true}");   
            } 
        }   
    }   
  
    
    private boolean isAjaxRequest(HttpServletRequest request) {   
        return request.getParameter("ajax") != null;   
    }
}  
