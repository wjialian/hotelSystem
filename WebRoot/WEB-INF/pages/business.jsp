<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>码先生酒店管理系统</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta http-equiv="Pragma" content="no-cache, must-revalidate, no-store"/>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/extjs/resources/css/ext-all.css" />
	<!--<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/extjs/resources/css/xtheme-gray.css" />-->
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/css/ext-patch.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/css/icons.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/hotelmaster/business/portal/portal.css"/>
  <script type="text/javascript" src="<%= path %>/public/scripts/extjs/adapter/ext/ext-base.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/extjs/ext-all-debug.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/source/locale/ext-lang-zh_CN.js"></script>
    
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/Ext.ux.MenuPanel.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/business.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/flash.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/AccordionView.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/portal/Portal.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/portal/Portlet.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/business/portal/PortalColumn.js"></script>
  </head>
  
  <body>
    
    
  </body>
</html>
