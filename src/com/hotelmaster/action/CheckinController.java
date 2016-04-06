package com.hotelmaster.action;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.home.web.json.CheckinOrderJson;
import com.hotelmaster.home.web.util.CheckinOrderUtil;
import com.hotelmaster.po.BaseInfo;
import com.hotelmaster.po.CheckinItem;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.ReservOrder;
import com.hotelmaster.po.Room;
import com.hotelmaster.service.BusinessService;
public class CheckinController extends MultiActionController {
	private final static Logger log = Logger.getLogger(CheckinController.class);
	private BusinessService businessService;
	
	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return null;
	}
	/**
	 * 
	 * 创建登记信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView checkin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {//进行入住登记
		request.setCharacterEncoding("UTF-8"); 				//设置请求编码
        response.setContentType("text/json;charset=utf-8"); //设置响应文本格式
		CheckinOrder checkinOrder=CheckinOrderUtil.
									createCheckinOrder(request);//创建入住登记订单
		String rooms=(String) request.getParameter("roomDataes").trim();//获得入住房间信息
		JSONArray jsonArray=JSONArray.fromObject(rooms);//转换成JSON数组
		Iterator iterator=jsonArray.iterator();				//获得数组迭代器
		JSONObject jsonObject=new JSONObject();			//新建JSON对象
		List<CheckinItem> checkinItemList=new ArrayList();//新建入住信息列表
		while(iterator.hasNext()){						//遍历JSON数组
			jsonObject=JSONObject.fromObject(iterator.next());//获得入住房间信息
			CheckinItem checkinItem=new CheckinItem();	//新建入住信息类实例对象
			String roomId=jsonObject.getString("rmId");	//获得入住房间编号信息
			Room room=businessService.findRoomById(roomId); //查找房间信息
			checkinItem.setRoom(room);					//设置房间信息
			checkinItem.setCimPrctPrice(new BigDecimal
					(jsonObject.getString("rmSetPrctPrice")));//设置房间实际价格
			checkinItem.setCimDiscount(new BigDecimal
					(jsonObject.getString("rmSetPrctDiscount")));//设置房间折扣
			checkinItemList.add(checkinItem);
		}
		checkinOrder.setCioState("已入住");				//设置登记状态
		checkinOrder.setCioGuestCatalog("散客");			//设置客人类别
		checkinOrder.setCioOrderId(createCheckinOrderId());//设置订单编号
		
		businessService.createCheckinOrder(checkinOrder,checkinItemList);
/*		if(businessService.createCheckinOrder
						(checkinOrder,checkinItemList)){//创建订单成功
            response.getWriter().write("{success: true}");//输出成功JSON字符串
		}else
		{
			response.getWriter().write("" +
					"{errors:'登记信息添加失败，请重新尝试!'}");//输出错误JSON字符串
		}*/
		return new ModelAndView("frontdesk");
	}
	/**
	 * 
	 * 获取登记单信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView getCheckinInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if(request.getParameter("rmId")!=null){
			String rmId=(String)request.getParameter("rmId").trim();
			CheckinOrder checkinOrder=businessService.findCheckinOrderByRmId(rmId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(checkinOrder);
			JSONObject jsonBack=checkinOrderJson.getJSONObject();
			jsonBack.put("success", true);
			System.out.println(jsonBack);
			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(jsonBack);
		}else{
			log.error("getCheckinInfo failed,rmId==null");
		}
		return null;
	}
	/**
	 * 
	 * 预定入住登记信息加载   ！！！预定后到店点击确认
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView reservInLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		log.info("Someone come from ip address <"
				+ request.getRemoteAddr() + ">");
		System.out.println("reach checkinController reservInLoad()");
		if(request.getParameter("roId")!=null&&(String)request.getParameter("roId").trim()!=""){
			String roId=(String)request.getParameter("roId").trim();
			ReservOrder reservOrder=businessService.findReservById(roId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(reservOrder);
			
			JSONObject jsonBack=checkinOrderJson.getReservJSONObject();
			jsonBack.put("success", true);
			System.out.println(jsonBack);
			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			
			//checkin(request, response);
			out.print(jsonBack);
		}else if(request.getParameter("rmId")!=null){
			String rmId=(String)request.getParameter("rmId").trim();
			ReservOrder reservOrder=businessService.findReservOrderByRmId(rmId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(reservOrder);
			JSONObject jsonBack=checkinOrderJson.getReservJSONObject();
			jsonBack.put("success", true);
			System.out.println(jsonBack);
			//{"data":{"cioBedRate":"0","cioCause":"","cioGroupName":"","cioGuestCardCatalog":"散客","cioGuestCardId":"350821199208195131","cioGuestCatalog":"identityCard","cioGuestGender":"male","cioGuestName":"wu","cioGuestType":"普通客人","cioId":"","cioInDateTime":"2016-04-06 18:00","cioIsReservId":"8a9e3cdb53e8fad80153e8fef9520003","cioManNumber":"2","cioOperator":"Admin","cioPaidMoney":0,"cioPaymentModel":"","cioPrctOutDateTime":"2016-04-07 12:00","cioPreOutDateTime":"2016-04-07 12:00","cioState":"","cioTotalRate":0,"cioOrderId":""},"success":true}

			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			
			out.print(jsonBack);
		}
		else{
			log.error("reservInLoad failed,roId==null");
		}
		return null;
	}

	/**获取登记项信息-->预定入住登记信息加载
	 * 
	 * 获取登记项信息(房间)
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView findCheckinRooms(HttpServletRequest request,	//单条记录删除 
			HttpServletResponse response) throws Exception {
		if(request.getParameter("rmId")!=null && request.getParameter("type")==null){
			String rmId=(String)request.getParameter("rmId").trim();
			CheckinOrder checkinOrder=businessService.findCheckinOrderByRmId(rmId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(checkinOrder);
			JSONObject jsonBack=checkinOrderJson.getItemJsonObject();
			//jsonBack.put("success", true);
			System.out.println(jsonBack);
			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(jsonBack);
		}else if(request.getParameter("rmId")!=null 
			&& request.getParameter("type")!=null){
		
			String rmId=(String)request.getParameter("rmId").trim();
			ReservOrder reservOrder=businessService.findReservOrderByRmId(rmId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(reservOrder);
			JSONObject jsonBack=checkinOrderJson.getReservItemJsonObject();
			
			
			
			System.out.println(jsonBack);
			//{"rooms":[{"rmId":"9207","rmPrctPrice":260,"rmState":1,"rmCatalog":"001","rmPrctDiscount":100,"rmSetPrctDiscount":1,"rmSetPrctPrice":260}]}

			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(jsonBack);
		}
		else if(request.getParameter("cioId")!=null){
			//由登记单PKID获得登记信息
			String cioId=(String)request.getParameter("cioId").trim();	
		}else if(request.getParameter("roId")!=null){
			String roId=(String)request.getParameter("roId").trim();
			ReservOrder reservOrder=businessService.findReservById(roId);
			CheckinOrderJson checkinOrderJson=new CheckinOrderJson(reservOrder);
			JSONObject jsonBack=checkinOrderJson.getReservItemJsonObject();
			System.out.println(jsonBack);
			request.setCharacterEncoding("utf-8");   
			response.setContentType("application/json;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(jsonBack);
		}
		else{
			log.error("getCheckinInfo failed,rmId==null");
		}
		return null;
	}
	private String createCheckinOrderId(){
		String orderId="CIO",baseString="";
		BaseInfo orderIdBaseInfo=businessService.findBaseInfoByName("CheckinOrderID");
		String baseId=orderIdBaseInfo.getBioValue();
		System.out.println(baseId);
		for(int i=baseId.length();i<8;i++){
			baseString=baseString+"0";
		}
		orderId=orderId+baseString+baseId;
		int baseIdNum=Integer.parseInt(baseId);
		int updateIdNum=baseIdNum+1;
		orderIdBaseInfo.setBioValue(String.valueOf(updateIdNum));
		businessService.updateBaseInfoCioOrder(orderIdBaseInfo);
		System.out.println(orderId);
		return orderId;
	}
	public BusinessService getBusinessService() {
		return businessService;
	}
	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
}
