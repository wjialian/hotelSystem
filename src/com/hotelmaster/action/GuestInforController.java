package com.hotelmaster.action;

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.home.web.util.GuestInforUtil;
import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Page;
import com.hotelmaster.service.BusinessService;

/**
 * Class description goes here.
 * 
 * @author heiosha
 * @Date May 21, 2008
 * @Description 处理Extjs对客人相关信息的请求
 */

public class GuestInforController extends MultiActionController {
	private BusinessService businessService;
	private final static Logger log = Logger
			.getLogger(GuestInforController.class);
	private GuestInforUtil guestInforUtil;
	private String start;
	private String limit;
	private String gtId;
	
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @param start,limit,gtId
	 * @Description 通过gtId来在客史档案中查询该客户的交易记录
	 */
	public ModelAndView dealGuestHistoryQueryRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if ((String) request.getParameter("start").trim() != null) {
			start = (String) request.getParameter("start").trim();
			log.info(start);
		} else {
			log.info("start is null");
			return null;
		}
		if ((String) request.getParameter("limit").trim() != null) {
			limit = (String) request.getParameter("limit").trim();
			log.info(limit);
		} else {
			log.info("limit is null");
			return null;
		}
		if ((String) request.getParameter("gtId").trim() != null) {
			gtId = (String) request.getParameter("gtId").trim();
			log.info(gtId);
		} else {
			log.info("gtId is null");
			return null;
		}
		//gtId = "402881e51a1a9664011a1aee1bd500010";
		JSONArray jsonItems = new JSONArray();
		Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));
		long count = businessService.getHistoryTotalCount(gtId);
		//page.setTotalCount(Integer.parseInt(String.valueOf(count)));
		List<Balancement> balancementList = businessService.queryHistoryInformation(page, gtId);
		System.out.println(balancementList);
		System.out.println(count);
		Iterator i = balancementList.iterator();
		while (i.hasNext()) {
			Balancement historyData = (Balancement) i.next();
			CheckinOrder checkinOrder = businessService.findCheckinOrderByCioId(historyData.getBmCheckinOrderId());
			String balancementTime = String.valueOf(historyData.getBmCreateTime());
			String balancementId = checkinOrder.getCioOrderId();
			String balancementExpenses = String.valueOf(historyData.getBmTotalRate());
			String balancementResult = historyData.getBmType();
			JSONObject object = new JSONObject();
			object.put("balancementId", balancementId);
			object.put("balancementTime", balancementTime);
			object.put("balancementExpenses", balancementExpenses);
			object.put("balancementResult", balancementResult);
			jsonItems.add(object);
		}

		JSONObject json = new JSONObject();
		json.put("data", jsonItems);
		json.put("totalSize", count);
		System.out.println(json);
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.print(json);
		return null;
	}
	
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @Description 处理Extjs对客人的删除请求,接受guestid，进行数据库查找并删除
	 */
	
	public ModelAndView dealGuestDelRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/json;charset=utf-8");
		if ((String) request.getParameter("gtId").trim() == null) {
			log.info("gtId is null");
			response.getWriter().write("{failure: true}");
		} else {
			log.info("turning to the delGuest function");
			Guest guest = new Guest();
			String gtId = GuestInforUtil.dealGuestDelRequest(request);
			log.info(gtId);
			guest = businessService.findGuestByGtId(gtId);
			boolean isDelete = businessService.delGuest(guest);
			if (!isDelete) {
				response.getWriter().write("{failure:true,reason:'所要删除的数据不存在'}");
			} else {
				log.info("Err on delete guest");
				response.getWriter().write("{success: true}");
			}
		}
		return null;
	}
	
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @Description 处理Extjs对选中客人的删除请求,接受json数据，逐个调用businessService.delGuest方法
	 */
	
	public ModelAndView dealGuestDelSelectedRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/json;charset=utf-8");
			String guestsJson=(String) request.getParameter("json").trim();
			JSONArray jsonArray=JSONArray.fromObject(guestsJson);//[{},{}]	
			Iterator iterator=jsonArray.iterator();
			JSONObject jsonObject=new JSONObject();
			while(iterator.hasNext()){
				jsonObject=JSONObject.fromObject(iterator.next());//{}
				Guest guest=new Guest();
				guest = businessService.findGuestByGtId(jsonObject.getString("gtId"));
				boolean isDelete = businessService.delGuest(guest);
				if (!isDelete) {
					log.info("Err on delete guest");
					response.getWriter().write("{failure:true}");
				}
			}
			response.getWriter().write("{success: true}");
		return null;
	}
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @param start,limit
	 * @Description 接受start,limit值来分页查询数据
	 */
	public ModelAndView listAllGuests(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		System.out.println("reach GuestInforController's listAllGuests method");
		/** ************************************************** */
		if ((String) request.getParameter("start").trim() != null) {
			start = (String) request.getParameter("start").trim();
			log.info(start);
		} else {
			log.info("start is null");
			return null;
		}
		if ((String) request.getParameter("limit").trim() != null) {
			limit = (String) request.getParameter("limit").trim();
			log.info(limit);
		} else {
			log.info("limit is null");
			return null;
		}

		JSONArray jsonItems = new JSONArray();
		Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));
		Guest guest = new Guest();
		List<Guest> guestsList = businessService.findAllGuests(page);
		long count = businessService.getGuestTotalCount();
		System.out.println(guestsList);
		System.out.println(count);
		Iterator i = guestsList.iterator();
		while (i.hasNext()) {
			guest = (Guest) i.next();
			String time = String.valueOf(guest.getGtCreateTime());
			JSONObject object = JSONObject.fromObject(guest);
			object.remove("gtCreateTime");
			object.put("gtCreateTime", time);
			jsonItems.add(object);
		}

		JSONObject json = new JSONObject();
		json.put("data", jsonItems);
		json.put("totalSize", count);
		System.out.println(json);
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.print(json);
		return null;
	}
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @param gtCardId
	 * @Description 查找guest,得到结果后返回给guestDetailForm
	 */
	public ModelAndView findGuestByGtCardId(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String gtCardId = null;
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		if ((String) request.getParameter("gtCardId").trim() != null) {
			gtCardId = (String) request.getParameter("gtCardId").trim();
			log.info(gtCardId);
		} else {
			log.info("gtCardId is null");
			return null;
		}
		Guest guest = new Guest();
		guest = businessService.findGuestByGtCardId(gtCardId);
		if(guest==null){
			response.getWriter().write("{failure:true,reason:'无该用户信息'}");
		}else{
			//response.getWriter().write("{success: true}");
			//String time = String.valueOf(guest.getGtCreateTime());
			JSONObject object = JSONObject.fromObject(guest);
			object.remove("gtCreateTime");
			//object.put("gtCreateTime", time);
			//jsonItems.add(object);
			JSONObject json = new JSONObject();
			json.put("data", object);
			json.put("success", true);
			System.out.println(json);
			PrintWriter out = response.getWriter();
			out.print(json);
		}
		return null;
	}
	/**
	 * Methods description goes here.
	 * 
	 * @author heiosha
	 * @Date May 21, 2008
	 * @param fileds,values
	 * @Description 查找guest
	 */
	public void queryGuestInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String value = null;
		JSONArray jsonArray = new JSONArray();
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		if ((String) request.getParameter("value").trim() != null) {
			value = (String) request.getParameter("value").trim();
			log.info(value);
		} else {
			log.info("value is null");
		}
		/*if ((String) request.getParameter("fields").trim() != null) {
			String temp = (String) request.getParameter("fields").trim();
			jsonArray = JSONArray.fromObject(temp);
			//jsonArray = jsonArray || "gtId";
			log.info(jsonArray);
		} else {
			log.info("fields is null");
		}*/
		 Guest guest = businessService.queryGuestInfo(value, jsonArray);
		 if(guest==null){
			 	return;
				//response.getWriter().write("{failure:true,reason:'无该用户信息'}");
			}else{
				String time = String.valueOf(guest.getGtCreateTime());
				JSONObject object = JSONObject.fromObject(guest);
				object.remove("gtCreateTime");
				object.put("gtCreateTime", time);
				JSONArray jsonItems = new JSONArray();
				jsonItems.add(object);
				JSONObject json = new JSONObject();
				json.put("data", jsonItems);
				json.put("totalSize", "１");
				System.out.println(json);
				PrintWriter out = response.getWriter();
				out.print(json);
			}
	}
	/**
	 * Methohs description goes here.
	 * 
	 * @parameter 
	 * @Date May 21, 2008
	 *
	 */
	public void dealGuestFromRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");						//设置请求编码格式
		response.setContentType("application/json;charset=utf-8");	//设置响应文本类型
		if ((String) request.getParameter("json").trim() != null) { //判断参数是否为空
			Guest guest = new Guest();								//新建客户信息对象
			if(request.getParameter("update").trim().equals("1")){	//判断是否为更新客户
				guest = GuestInforUtil.dealGuestUpdateRequest(request);
				boolean isUpdateSuccess = 
							businessService.updateGuest(guest);		//执行客户信息更新
				if (!isUpdateSuccess) {								//更新成功
					response.getWriter().write("{failure:true}");	//输出更新失败JSON字符串
				} else {
					response.getWriter().write("{success:true}");	//输出更新成功JSON字符串
					}
			} else{													//保存用户
				guest = GuestInforUtil.dealGuestAddRequest(request);
				boolean isAddSuccess = 
							businessService.addNewGuest(guest);		//执行保存
				if (!isAddSuccess) {								
					response.getWriter().write("{failure:true}");	//输出保存失败JSON字符串
				} else {
					response.getWriter().write("{success:true}");	//输出保存成功JSON字符串
					}
				}
		} else {													//json参数为空
			response.getWriter().write("{failure:true}");			//输出操作失败JSON字符串
		}

	}

	/** ***************************************************************** */
	public GuestInforUtil getGuestInforUtil() {
		return guestInforUtil;
	}

	public void setGuestInforUtil(GuestInforUtil guestInforUtil) {
		this.guestInforUtil = guestInforUtil;
	}

	public BusinessService getBusinessService() {
		return businessService;
	}

	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}

	public ModelAndView init(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return null;
	}
}
