package com.hotelmaster.action;

import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Operator;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.Room;
import com.hotelmaster.po.RoomCatalog;
import com.hotelmaster.service.BusinessService;

public class BasicSettingController extends MultiActionController {
		private final static Logger log = Logger.getLogger(BasicSettingController.class);
		private BusinessService businessService;
		public String json;
		String start = null; 
		String limit = null;
		public ModelAndView init(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			// start to write something to the log
			log.info("Someone come from ip address <"
					+ request.getRemoteAddr() + ">");
			System.out.println("reach BasicSettingController");
			
			//roomInfo=businessService.findRoomDetails("8108");
			
			return new ModelAndView("basicsetting");
		}
		
		public void listAllRooms(HttpServletRequest request,
				HttpServletResponse response) throws Exception {	
			System.out.println("-------------------------");
			JSONArray jsonItems=new JSONArray();
			/*if ((String) request.getParameter("start").trim() != null) {
				start = (String) request.getParameter("start").trim();
				log.info(start);
			} else {
				log.info("start is null");
				return;
			}
			if ((String) request.getParameter("limit").trim() != null) {
				limit = (String) request.getParameter("limit").trim();
				log.info(limit);
			} else {
				log.info("limit is null");
				return;
			}
			Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));*/
			Page page = new Page(0);
			List<Room> roomList=businessService.findAllRooms(page);
			long cout = businessService.queryRoomCount();
			Iterator i=roomList.iterator();
			Room room=new Room();
			while(i.hasNext()){
				room=(Room)i.next();
				JSONObject json = JSONObject.fromObject(room);
				json.put("isNew", "0");
				jsonItems.add(json);
				
			}
			JSONObject jsonBack=new JSONObject();
			jsonBack.put("rooms", jsonItems);
			jsonBack.put("totalSize", cout);
			System.out.println(jsonBack);
			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(jsonBack);
		}
		
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealRoomUpdateRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			response.setContentType("application/json;charset=utf-8");
			if ((String) request.getParameter("json").trim() != null) { 
				json = (String) request.getParameter("json").trim();
				log.info("Update the room information");
				log.info(json);
				JSONObject jsonObject = JSONObject.fromObject( json );
				String state = jsonObject.getString("rmState");
				String pic = jsonObject.getString("rmPicture");
				jsonObject.remove("isNew");
				jsonObject.remove("rmState");
				jsonObject.remove("rmPicture");
				if(state.equals("空闲")){
				   state = "0";
				}else if(state.equals("预定")){
					state = "1";
				}else if(state.equals("租用")){
					state = "2";
				}else if(state.equals("结帐")){
					state = "3";
				}else if(state.equals("清洁")){
					state = "4";
				}else if(state.equals("锁房")){
					state = "5";
				}
				jsonObject.put("rmState", state);
				if(pic.equals("标准间")){
					pic = "public/images/rooms/standardroom.gif";
					}else if(pic.equals("单人间")){
						pic = "public/images/rooms/single.gif";
					}
				jsonObject.put("rmPicture", pic);
				log.info(jsonObject);
				Room room = (Room) JSONObject.toBean( jsonObject, Room.class );
				log.info(room);
				businessService.updateRoom(room);
			} else {
				response.getWriter().write("{failure:true}");
			}

		}
		
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealRoomAddRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			response.setContentType("application/json;charset=utf-8");
			if ((String) request.getParameter("json").trim() != null) { 
				json = (String) request.getParameter("json").trim();
				log.info("Add new room record");
				log.info(json);
				JSONObject jsonObject = JSONObject.fromObject( json );
				String state = jsonObject.getString("rmState");
				String pic = jsonObject.getString("rmPicture");
				jsonObject.remove("isNew");
				jsonObject.remove("rmState");
				jsonObject.remove("rmPicture");
				if(state.equals("空闲")){
					   state = "0";
				}else if(state.equals("预定")){
						state = "1";
				}else if(state.equals("租用")){
						state = "2";
				}else if(state.equals("结帐")){
						state = "3";
				}else if(state.equals("清洁")){
						state = "4";
				}else if(state.equals("锁房")){
						state = "5";
				}
				jsonObject.put("rmState", state);
				if(pic.equals("标准间")){
					pic = "public/images/rooms/standardroom.gif";
					}else if(pic.equals("单人间")){
						pic = "public/images/rooms/single.gif";
					}
				jsonObject.put("rmPicture", pic);
				log.info(jsonObject);
				Room room = (Room) JSONObject.toBean( jsonObject, Room.class );
				boolean isAdd = businessService.addNewRoom(room);
				if(isAdd){
					response.getWriter().write("{success:true}");
				} else {
					response.getWriter().write("{failure:true}");
				}
			} else {
				response.getWriter().write("{failure:true}");
			}

		}
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealRoomDelRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json;charset=utf-8");
			String roomJson=(String) request.getParameter("json").trim();
			JSONArray jsonArray=JSONArray.fromObject(roomJson);//[{},{}]	
			Iterator iterator=jsonArray.iterator();
			JSONObject jsonObject=new JSONObject();
			while(iterator.hasNext()){
				jsonObject=JSONObject.fromObject(iterator.next());//{}
				Room room=new Room();
				room = businessService.findRoomById(jsonObject.getString("rmId"));
				boolean isDelete = businessService.deleteRoom(room);
				if (!isDelete) {
					log.info("Err on delete guest");
					response.getWriter().write("{failure:true,reason:'不存在要删除的房间'}");
				}
			}
			response.getWriter().write("{success: true}");
		}
		
		public void showAllRoomCatalogName(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json;charset=utf-8");
			RoomCatalog roomCatalog = new RoomCatalog();
			List<RoomCatalog> roomCatalogList = businessService.showAllRoomCatalog();
			Iterator i = roomCatalogList.iterator();
			JSONArray jsonItems = new JSONArray();
			while (i.hasNext()) {
				roomCatalog = (RoomCatalog)i.next();
				JSONObject object = new JSONObject();
				object.put("rmCatalog", roomCatalog.getRcName());
				jsonItems.add(object);
			}
			JSONObject json = new JSONObject();
			json.put("rows", jsonItems);
			System.out.println(json);
			PrintWriter out = response.getWriter();
			out.print(json);
		}
		
		public void showAllRoomCatalog(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8");//设置请求编码格式
			response.setContentType("text/json;charset=utf-8");//设置响应文本格式
			RoomCatalog roomCatalog = new RoomCatalog();//客房类型
			List<RoomCatalog> roomCatalogList = 
					businessService.showAllRoomCatalog();//查询所有客房类型
			Iterator i = roomCatalogList.iterator();//获得客房类型列表迭代器
			JSONArray jsonItems = new JSONArray();//初始化JSON数组
			while (i.hasNext()) {//遍历	客房类型列表
				roomCatalog = (RoomCatalog)i.next();//取得客房类型
				JSONObject object = 
					JSONObject.fromObject(roomCatalog);//转换成JSON对象
				jsonItems.add(object);//添加JSON格式客房对象
			}
			JSONObject json = new JSONObject();//新建JSON对象
			json.put("rooms", jsonItems);//添加客房类型列表
			PrintWriter out = response.getWriter();//获得响应输出流
			out.print(json);//输出JSON格式字符串
		}
		
		
		public void dealRoomCatalogUpdateRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			response.setContentType("application/json;charset=utf-8");	//设置响应文本格式
			if ((String) request.getParameter("json").trim() != null){ 	//如果json参数不为空
				json = (String) request.getParameter("json").trim();	//获得json参数值
				JSONObject jsonObject = JSONObject.fromObject(json);	//转换成JSON对象
				RoomCatalog roomCatalog = (RoomCatalog) JSONObject.
							toBean( jsonObject, RoomCatalog.class );	//转换成客房类型对象
				businessService.updateRoomCatalog(roomCatalog);			//执行更新
			} else {
				response.getWriter().write("{failure:true}");			//返回失败JSON字符串
			}
		}
		
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealRoomCatalogAddRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			response.setContentType("application/json;charset=utf-8");//设置响应文本格式
			if ((String) request.getParameter("json").trim() != null) { //如果json参数不为空
				json = (String) request.getParameter("json").trim();//获得json参数值
				JSONObject jsonObject = JSONObject.fromObject(json);//转换成JSON对象
				jsonObject.remove("rcId");							//移除客房类型编号属性
				RoomCatalog roomCatalog = (RoomCatalog) 
					JSONObject.toBean(jsonObject,RoomCatalog.class);//转换成客房类型对象
				boolean isAdd = businessService.
								addNewRoomCatalog(roomCatalog);		//执行客房类型添加
				if(isAdd){											//添加成功
					response.getWriter().write("{success:true}");	//返回成功JSON字符串
				} else {
					response.getWriter().write("{failure:true}");	//返回失败JSON字符串
				}
			} else {
				response.getWriter().write("{failure:true}");		//返回失败JSON字符串
			}
		}
		public void dealRoomCatalogDelRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8");				//设置请求编码格式
			response.setContentType("text/json;charset=utf-8");//设置响应文本
			String roomJson=(String) request.getParameter("json").trim();//获得json参数值格式
			JSONArray jsonArray=JSONArray.fromObject(roomJson);//转换成JSON数组	
			Iterator iterator=jsonArray.iterator();//获得数组迭代器
			JSONObject jsonObject=new JSONObject();//新建JSON对象
			while(iterator.hasNext()){//遍历JSON数组
				jsonObject=JSONObject.fromObject(iterator.next());//获得JSON对象
				RoomCatalog roomCatalog =(RoomCatalog)JSONObject
						.toBean( jsonObject, RoomCatalog.class );//转换成客房类型对象
				boolean isDelete = businessService.
						delRoomCatalog(roomCatalog);//执行删除
				if (!isDelete) {					//删除失败
					response.getWriter().write(
					"{failure:true,reason:'不存在要删除的房间'}");	//输出失败JSON字符串
				}
			}
			response.getWriter().write("{success: true}");		//输出成功JSON字符串
		}
/**************************************************************/
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 * @discipt Operator
		 */
		public void showAllOperator(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json;charset=utf-8");
			Operator operator = new Operator();
			List<Operator> operatorList = businessService.showAllOperators();
			Iterator i = operatorList.iterator();
			JSONArray jsonItems = new JSONArray();
			while (i.hasNext()) {
				operator = (Operator)i.next();
				String time = String.valueOf(operator.getOpCreateTime());
				JSONObject object = JSONObject.fromObject(operator);
				object.remove("opCreateTime");
				object.put("opCreateTime", time);
				object.put("isNew", "0");
				jsonItems.add(object);
			}
			JSONObject json = new JSONObject();
			json.put("operators", jsonItems);
			System.out.println(json);
			PrintWriter out = response.getWriter();
			out.print(json);
		}
		
		public void dealOperatorUpdateRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			response.setContentType("application/json;charset=utf-8");
			if ((String) request.getParameter("json").trim() != null) { 
				json = (String) request.getParameter("json").trim();
				log.info("Update the operator information");
				log.info(json);
				JSONObject jsonObject = JSONObject.fromObject( json );
				String privilege = jsonObject.getString("opPrivilege");
				String createTime = jsonObject.getString("opCreateTime");
				if(privilege=="普通权限"){
					privilege = "0";
				} else if (privilege=="管理员权限"){
					privilege = "255";
				}
				jsonObject.remove("isNew");
				jsonObject.remove("opCreateTime");
				jsonObject.remove("opPrivilege");
				jsonObject.put("opCreateTime", Timestamp.valueOf(createTime));
				jsonObject.put("opCreateTime", privilege);
				log.info(jsonObject);
				Operator operator = businessService.findOperatorByOpUserName(jsonObject.getString("opUserName"));
				if(operator!=null){  //数据库有该数据
					log.info(operator);
					Operator newOperator = (Operator) JSONObject.toBean( jsonObject, Operator.class );
					businessService.updateOperator(newOperator);
				}
			} else {
				response.getWriter().write("{failure:true}");
			}

		}
		
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealOperatorAddRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			response.setContentType("application/json;charset=utf-8");
			if ((String) request.getParameter("json").trim() != null) { 
				json = (String) request.getParameter("json").trim();
				log.info("Add new operator record");
				log.info(json);
				JSONObject jsonObject = JSONObject.fromObject( json );
				String privilege = jsonObject.getString("opPrivilege");
				if(privilege=="普通权限"){
					privilege = "0";
				} else if (privilege=="管理员权限"){
					privilege = "255";
				}
				jsonObject.remove("isNew");
				jsonObject.remove("opCreateTime");
				jsonObject.remove("opPrivilege");
				jsonObject.put("opPrivilege", privilege);
				Timestamp createTime = new Timestamp(System.currentTimeMillis());
				log.info(jsonObject);
				Operator operator = (Operator) JSONObject.toBean( jsonObject, Operator.class );
				operator.setOpCreateTime(createTime);
				log.info(operator);
				boolean isAdd = businessService.addNewOperator(operator);
				if(isAdd){
					response.getWriter().write("{success:true}");
				} else {
					response.getWriter().write("{failure:true}");
				}
			} else {
				response.getWriter().write("{failure:true}");
			}

		}
		/**
		 * Methohs description goes here.
		 * 
		 * @parameter 
		 * @Date May 21, 2008
		 *
		 */
		public void dealOperatorDelRequest(HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			/*
			 * String gtId = null; String gtName = null; gtId = (String)
			 * request.getParameter("gtId").trim(); gtName = (String)
			 * request.getParameter("gtId").trim(); if (gtId != null) {
			 * guestInforUtil.updateGuestInforRequest(request, gtId); } else if
			 * (gtName != null) {
			 */
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json;charset=utf-8");
			String operatorJson=(String) request.getParameter("json").trim();
			JSONArray jsonArray=JSONArray.fromObject(operatorJson);//[{},{}]	
			Iterator iterator=jsonArray.iterator();
			JSONObject jsonObject=new JSONObject();
			while(iterator.hasNext()){
				jsonObject=JSONObject.fromObject(iterator.next());//{}
				Operator operator = new Operator();
				operator = businessService.findOperatorByOpUserName(jsonObject.getString("opUserName"));
				boolean isDelete = businessService.deleteOperator(operator);
				if (!isDelete) {
					log.info("Err on delete guest");
					response.getWriter().write("{failure:true,reason:'不存在要删除的房间'}");
				}
			}
			response.getWriter().write("{success: true}");
		} 
/*******************************************************************/		
		public BusinessService getBusinessService() {
			return businessService;
		}
	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
	/**************************************************************/
	/**
	 * Methohs description goes here.
	 * 
	 * @parameter 
	 * @Date May 21, 2008
	 * @discipt
	 */
	public void showAllFloor(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/json;charset=utf-8");
		//String jsonss = (String) request.getParameter("json").trim();
		Floor floor = new Floor();
		List<Floor> floorList = businessService.showAllFloor();
		Iterator i = floorList.iterator();
		JSONArray jsonItems = new JSONArray();
		while (i.hasNext()) {
			floor = (Floor)i.next();
			JSONObject object = JSONObject.fromObject(floor);
			object.put("isNew", "0");
			jsonItems.add(object);
		}
		JSONObject json = new JSONObject();
		json.put("floors", jsonItems);
		System.out.println(json);
		PrintWriter out = response.getWriter();
		out.print(json);
	}
}
