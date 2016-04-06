package com.hotelmaster.action;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.acegisecurity.context.SecurityContext;
import org.acegisecurity.context.SecurityContextHolder;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.po.BaseInfo;
import com.hotelmaster.po.Page;
import com.hotelmaster.po.ReservItem;
import com.hotelmaster.po.ReservOrder;
import com.hotelmaster.po.Room;
import com.hotelmaster.service.BusinessService;

public class FrontdeskController extends MultiActionController {
	private final static Logger log = Logger.getLogger(FrontdeskController.class);
	private BusinessService businessService;
	
	public BusinessService getBusinessService() {
		return businessService;
	}
	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// start to write something to the log
		log.info("Someone come from ip address <"
				+ request.getRemoteAddr() + ">");
		System.out.println("reach frontdeskcontroller init");
		//1:做预定房房态每天更新->更改为每次进入系统更新
		/*BaseInfo reservUpdatedBaseInfo=businessService.findBaseInfoByName("ReservUpdated");
		Timestamp updateTime=Timestamp.valueOf(reservUpdatedBaseInfo.getBioValue());
		String updateTimeString=String.valueOf(
				new SimpleDateFormat("yyyy-MM-dd").format(updateTime)
		);
		String todayTimeString=String.valueOf(
				new SimpleDateFormat("yyyy-MM-dd").format(new Date())
		);
		if(!updateTimeString.equals(todayTimeString)){
			//做更新操作
			List<ReservOrder> reservOrders=businessService.findTodayReservOrders();
			for(ReservOrder item:reservOrders){
				for(ReservItem reservItem:item.getReservItems()){
					Room room=reservItem.getRoom();
					room.setRmState(1);
					businessService.updateRoom(room);
				}
			}
			Calendar tCal = Calendar.getInstance();
			Timestamp curDate=new Timestamp(tCal.getTime().getTime());
			reservUpdatedBaseInfo.setBioValue(curDate.toString());
			businessService.updateBaseInfoCioOrder(reservUpdatedBaseInfo);
		}*/
		List<ReservOrder> reservOrders=businessService.findTodayReservOrders();
		for(ReservOrder item:reservOrders){
			for(ReservItem reservItem:item.getReservItems()){
				Room room=reservItem.getRoom();
				room.setRmState(1);
				businessService.updateRoom(room);
			}
		}
		List<Room> reservedRoomList=businessService.findReservedRooms();
		for(Room item :reservedRoomList){
			ReservOrder reservOrder=businessService.findReservOrderByRmId(item.getRmId());
			if(reservOrder!=null){
			Timestamp roInDateTime=reservOrder.getRoInDateTime();
			String roInDateTimeString=String.valueOf(
				new SimpleDateFormat("yyyy-MM-dd").format(roInDateTime)
			);
			String todayTimeString=String.valueOf(
					new SimpleDateFormat("yyyy-MM-dd").format(new Date())
			);
			//如果不等于今天则已过期
			if(!roInDateTimeString.equals(todayTimeString)){
				item.setRmState(0);
				businessService.updateRoom(item);
			}
			}
		}
		//2:返回当前操作员信息
		SecurityContext ctx = SecurityContextHolder.getContext();
		//ctx.getAuthentication().;
		return new ModelAndView("frontdesk");
	}
	public ModelAndView listAllRooms(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");  		//设置请求编号格式 
		response.setContentType("application/json;charset=utf-8");//设置响应文本格式
		PrintWriter out = response.getWriter();			//获得输出流对象
		JSONArray jsonItems=new JSONArray();			//初始化JSON数组
		Page page = new Page(0);						//设置当前页为0
		List<Room> roomList=businessService.findAllRooms(page);//查询所有客房信息
		Iterator i=roomList.iterator();					//获得列表迭代器
		Room room=new Room();							//客房信息对象
		while(i.hasNext()){								//遍历客房信息列表
			room=(Room)i.next();						//取得客房信息
			jsonItems.add(JSONObject.fromObject(room));	//添加到JSON数组中
		}
		JSONObject jsonBack=new JSONObject();			//初始化JSON对象
		jsonBack.put("rooms", jsonItems);				//设置属性rooms值
		jsonBack.put("totalSize", jsonItems.size());	//设置属性totalSize值
		out.print(jsonBack);							//输出JSON数组
		return null;
	}
	
	public ModelAndView updateRoom(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// start to write something to the log
		System.out.println("reach frontdeskcontroller's updateRoom method");
		request.setCharacterEncoding("UTF-8");   
        response.setContentType("text/json;charset=utf-8");
        if(request.getParameter("rmRecord")!=null){
        	String roomRecord=(String)request.getParameter("rmRecord").trim();
        	JSONObject jsonObject=JSONObject.fromObject(roomRecord);
    		Room room = new Room();
    		room.setRmArea(jsonObject.getString("rmArea"));
    		//room.setRmAvailable(jsonObject.getString("rmAvailable"));
    		room.setRmAvailable(true);
    		room.setRmCatalog(jsonObject.getString("rmCatalog"));
    		room.setRmFloor(jsonObject.getString("rmFloor"));
    		room.setRmId(jsonObject.getString("rmId"));
    		room.setRmPicture(jsonObject.getString("rmPicture"));
    		room.setRmPrctDiscount(new BigDecimal(jsonObject.getString("rmPrctDiscount")));
    		room.setRmPrctPrice(new BigDecimal(jsonObject.getString("rmPrctPrice")));
    		room.setRmState(Integer.parseInt(jsonObject.getString("rmState")));
    		room.setRmTelphone(jsonObject.getString("rmTelphone"));
    		
    		businessService.updateRoom(room);
        	response.getWriter().write("{success:true}");
        }else{
        	 response.getWriter().write("{errors:[]}");
        }
		return null;
	}
}
