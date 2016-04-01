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
    <!-- GC -->
 	

    <link rel="stylesheet" type="text/css" href="<%= path %>/public/css/desktop.css" />
  </head>
  
  <body>
  	<!-- LIBS -->
 	<script type="text/javascript" src="<%= path %>/public/scripts/extjs/adapter/ext/ext-base.js"></script>
 	<!-- ENDLIBS -->
	
	
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ext-all-debug.js"></script>

    <!-- DESKTOP -->
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desktop1/StartMenu.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desktop1/TaskBar.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desktop1/Desktop.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desktop1/App.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desktop1/Module.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/desksample.js"></script>
        <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/ext-basex-min.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxmedia.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxflash.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxfusion.js"></script>
    <div id="x-desktop">
    <!--  
    	<a href="http://extjs.com" target="_blank" style="margin:5px; float:right;"><img src="<%= path %>/public/images/desktop/powered.gif" /></a>
	-->
    <dl id="x-shortcuts">
        <dt id="grid-win-shortcut">
            <a href="#"><img src="<%= path %>/public/images/desktop/s.gif" />
            <div>Grid Window</div></a>
        </dt>
        <dt id="acc-win-shortcut">
            <a href="#"><img src="<%= path %>/public/images/desktop/s.gif" />
            <div>Accordion Window</div></a>
        </dt>
    </dl>
	</div>

	<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbuttons-panel"></div>
	<div class="x-clear"></div>
	</div>
  </body>
</html>
