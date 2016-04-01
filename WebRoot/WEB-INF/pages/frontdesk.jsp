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
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/extjs/resources/css/xtheme-slate.css" />
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/css/ext-patch.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/css/icons.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/extjs/ux/Ext.ux.grid.RowActions.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/RoomDataView.css"/>
	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/hotelmaster/frontdesk/frontdesk.css"/>
  	<link rel="stylesheet" type="text/css" href="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/CheckInForm.css"/>
  </head>
  <body>
  	<div id="loading-mask" style="background-color: white"></div>
  	<div id="loading">
    	<div class="loading-indicator"><img src="public/images/desktop/blue-loading.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/><span id="loading-msg"></span></div>
 	</div>
 	
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '初始化核心代码...';</script>
 	<script type="text/javascript" src="<%= path %>/public/scripts/extjs/adapter/ext/ext-base.js"></script>
 	<!-- 框架代码 -->
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ext-all.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/source/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/Ext.ux.form.DateTime.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/Ext.ux.grid.RowActions.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/Ext.ux.grid.Search.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/TabCloseMenu.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/Toast.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/SearchField.js"></script>
 	<!-- ENDLIBS -->			
 	
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '初始化UI库...';</script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/GroupSummary.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/GroupSummary.css"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/ext-basex-min.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxmedia.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxflash.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/extjs/ux/funsion/uxfusion.js"></script>
 	<script type="text/javascript" src="<%= path %>/public/scripts/extjs/bugfix/DateFieldFix.js"></script>
    <!-- 系统代码 -->
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/frontdesk.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/MainMenuTree.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/MainView.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/MainHeader.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/RoomView.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guestview/GuestView.js"></script>
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '核算房间状态...';</script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/RoomDataView.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/CheckInForm.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/CheckoutWin.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/mainview/ReservInfoWin.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guestview/GuestDetailForm.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/Vtype.js"></script>
  	<script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/RowExpander.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guestview/GuestGrid.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guestview/GuestData.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/HistoryGrid.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/HistoryView.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/HistoryData.js"></script>
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '初始化数据...';</script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/GuestDetailGrid.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/guesthistory/PaymentDetailGrid.js"></script>
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/reserv/ReservCenter.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/reserv/ReservInfo.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/reserv/ReservManage.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/reserv/ReservSummary.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/businesscalculation/BusinessCal.js"></script> 
    <script type="text/javascript" src="<%= path %>/public/scripts/hotelmaster/frontdesk/businesscalculation/flash.js"></script>
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '欢迎进入酒店客房管理系统...';</script>
    
  </body>
</html>