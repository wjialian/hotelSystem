package com.hotelmaster.home.web.filter;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

public class RedirectResponseWrapper extends HttpServletResponseWrapper {   
    private String redirect;   
    
    public RedirectResponseWrapper(HttpServletResponse httpServletResponse) {   
        super(httpServletResponse);   
    }   
    
    public String getRedirect() {   
        return redirect;   
    }   
    
    public void sendRedirect(String string) throws IOException {   
        this.redirect = string;   
    }   
}   
