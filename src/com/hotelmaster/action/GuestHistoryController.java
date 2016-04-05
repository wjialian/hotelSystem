package com.hotelmaster.action;

import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hotelmaster.po.Balancement;
import com.hotelmaster.po.CheckinOrder;
import com.hotelmaster.po.Demand;
import com.hotelmaster.po.Floor;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.GuestHistory;
import com.hotelmaster.po.Operator;
import com.hotelmaster.po.Page;
import com.hotelmaster.service.BusinessService;

public class GuestHistoryController extends MultiActionController {
	private BusinessService businessService;
	private final static Logger log = Logger
			.getLogger(GuestHistoryController.class);
	
	public List<GuestHistory> findAllGuestHistory(Page page) {
		// TODO Auto-generated method stub
		return businessService.findAllGuestHistory(page);
	}
	
	public void queryCheckinOrderInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String cioOrderId = null;
		String showAllAction = null;
		String gtId = null;
		String start = null;
		String limit = null;
		String cioId = null;
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		if((String) request.getParameter("showAllAction").trim() != null){
			showAllAction = (String) request.getParameter("showAllAction").trim();
			log.info("showAllAction is "+showAllAction);
			if(showAllAction.equals("0")){  //show single result
				log.info("Come into the show single result area");
				if ((String) request.getParameter("ghCioOrderId").trim() != null) {
					cioOrderId = (String) request.getParameter("ghCioOrderId").trim();
					log.info(cioOrderId);
				} else {
					log.info("cioOrderId is null");
					return;
				}
				JSONArray jsonItems = new JSONArray();
				log.info("cioOrderId"+cioOrderId);
				CheckinOrder checkinOrder = businessService.findCheckinOrderByCioOrderId(cioOrderId); 
				JSONObject object = new JSONObject();
				object.put("cioId", checkinOrder.getCioId());
				object.put("cioGuestName", checkinOrder.getCioGuestName());
				object.put("cioManNumber", checkinOrder.getCioManNumber());
				object.put("cioGuestCatalog", checkinOrder.getCioGuestCatalog());
				object.put("cioGroupName", checkinOrder.getCioGroupName());
				object.put("cioCause", checkinOrder.getCioCause());
				object.put("cioInDateTime", String.valueOf(checkinOrder.getCioInDateTime()));
				object.put("cioPreOutDateTime", String.valueOf(checkinOrder.getCioPreOutDateTime()));
				object.put("cioPrctOutDateTime", String.valueOf(checkinOrder.getCioPrctOutDateTime()));
				object.put("cioPaymentModel", checkinOrder.getCioPaymentModel());
				object.put("cioIsReservId", checkinOrder.getCioIsReservId());
				object.put("cioOrderId", checkinOrder.getCioOrderId());
				object.put("cioTotalRate", checkinOrder.getCioTotalRate());
				object.put("cioOperator", checkinOrder.getCioOperator());
				jsonItems.add(object);
				JSONObject json = new JSONObject();
				json.put("data", jsonItems);
				json.put("totalSize", jsonItems.size());
				PrintWriter out = response.getWriter();
				out.print(json);
			} else {  //show all result
				log.info("Come into the show all result area");
				if ((String) request.getParameter("start").trim() != null) {
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
				Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));
				if ((String) request.getParameter("gtId").trim() != null) {
					gtId = (String) request.getParameter("gtId").trim();
					log.info(gtId);
				} else {
					log.info("gtId is null");
					return;
				}
				JSONArray jsonItems = new JSONArray();
				List<Balancement> balancementList = businessService.queryHistoryInformation(page, gtId);
				Iterator i = balancementList.iterator();
				while (i.hasNext()) {
					Balancement balancement = (Balancement) i.next();
					cioId = balancement.getBmCheckinOrderId();
					log.info("cioId"+cioId);
					CheckinOrder checkinOrder = businessService.findCheckinOrderByCioId(cioId); 
					JSONObject object = new JSONObject();
					object.put("cioId", checkinOrder.getCioId());
					object.put("cioGuestName", checkinOrder.getCioGuestName());
					object.put("cioManNumber", checkinOrder.getCioManNumber());
					object.put("cioGuestCatalog", checkinOrder.getCioGuestCatalog());
					object.put("cioGroupName", checkinOrder.getCioGroupName());
					object.put("cioCause", checkinOrder.getCioCause());
					object.put("cioInDateTime", String.valueOf(checkinOrder.getCioInDateTime()));
					object.put("cioPreOutDateTime", String.valueOf(checkinOrder.getCioPreOutDateTime()));
					object.put("cioPrctOutDateTime", String.valueOf(checkinOrder.getCioPrctOutDateTime()));
					object.put("cioPaymentModel", checkinOrder.getCioPaymentModel());
					object.put("cioIsReservId", checkinOrder.getCioIsReservId());
					object.put("cioOrderId", checkinOrder.getCioOrderId());
					object.put("cioTotalRate", checkinOrder.getCioTotalRate());
					object.put("cioOperator", checkinOrder.getCioOperator());
					jsonItems.add(object);
				}
				JSONObject json = new JSONObject();
				json.put("data", jsonItems);
				json.put("totalSize", jsonItems.size());
				log.info("show all result"+json);
				PrintWriter out = response.getWriter();
				out.print(json);
			}
		}
		
	}
	
	public ModelAndView listAllHistoryInformation(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, String> row = new HashMap<String, String>();
		String start = null;
		String limit = null;
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
		Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));
		JSONArray jsonItems = new JSONArray();
		List<GuestHistory> guestHistory = businessService.findAllGuestHistory(page);
		Iterator<GuestHistory> i = guestHistory.iterator();
		while (i.hasNext()) {
			GuestHistory historyData = (GuestHistory) i.next();
			String bmId = String.valueOf(historyData.getGhBalancementId());
			log.info(bmId);
			Balancement balancement = businessService.findBalancementInformationByBmId(bmId);
			log.info("checkinOrderId"+balancement.getBmCheckinOrderId());
			CheckinOrder checkinOrder = businessService.findCheckinOrderByCioId(balancement.getBmCheckinOrderId());
			Guest guest = businessService.findGuestByGtId(historyData.getGhGuestId());
			row.put("ghGuestId", historyData.getGhGuestId());
			row.put("ghGuestName", historyData.getGhGuestName());
			row.put("ghGuestCardId", guest.getGtCardId());
			row.put("ghCioOrderId", checkinOrder.getCioOrderId());
			row.put("ghPrctOutDateTime", String.valueOf(balancement.getBmCreateTime()));
			row.put("ghCioState", balancement.getBmType());
			row.put("ghPaidMoney", String.valueOf(balancement.getBmTotalRate()));
			row.put("ghRemark", historyData.getGhRemark());
			log.info(row);
			jsonItems.add(row);
		}
		JSONObject json = new JSONObject();
		json.put("data", jsonItems);
		json.put("totalSize", jsonItems.size());
		log.info(json);
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.print(json);
		return null;
	}
	//顾客需求发布展示，实时消息,存入
	public ModelAndView customerInformationAndNewsBymrcode(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		String roomid = (String) request.getParameter("roomid").trim();
		String time=(String) request.getParameter("time").trim();
		String name=(String) request.getParameter("name").trim();
		String detail=(String) request.getParameter("demand").trim();
		time = time.replaceFirst("年", "-").replaceFirst("月", "-").replaceFirst("日", "");
		int endIndex = time.indexOf("星");
		time = time.substring(0, endIndex-1).trim();
		
		Timestamp date=null;
		date=Timestamp.valueOf(time);
		String x = (int)(1+Math.random()*(10000-1+1))+"";
		Demand demand = new Demand();
		demand.setGcNAME(name);
		demand.setGcDETAIL(detail);
		demand.setGcTIME(date);
		demand.setGcID(x);
		businessService.addNewDemand(demand);
		return null;
	}
	
	
	//顾客需求发布展示，实时消息,取出
	public ModelAndView listAllcustomerInformationAndNews(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, String> row = new HashMap<String, String>();
		String start = null;
		String limit = null;
/*		if ((String) request.getParameter("start").trim() != null) {
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
		}*/
		//Page page = new Page(Integer.parseInt(start), Integer.parseInt(limit));
		JSONArray jsonItems = new JSONArray();
		List<Demand> guestDemand = businessService.showAllDemand();
		Iterator<Demand> i = guestDemand.iterator();
		while (i.hasNext()) {
			Demand demandData = (Demand) i.next();
			String time = String.valueOf(demandData.getGcTIME());
			JSONObject object = JSONObject.fromObject(demandData);
			object.remove("gcTIME");
			object.put("gcTIME", time);
			//object.put("isNew", "0");
			jsonItems.add(object);
		}
		JSONObject json = new JSONObject();
		json.put("data", jsonItems);
		json.put("totalSize", jsonItems.size());
		log.info(json);
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.print(json);
		return null;
	}
	
	//顾客需求发布展示，实时消息,全部删除
		public void allcustomerInformationAndNewsDelete(HttpServletRequest request,
				HttpServletResponse response) throws Exception {

			List<Demand> guestDemand = businessService.showAllDemand();
			Iterator<Demand> i = guestDemand.iterator();
			while (i.hasNext()) {
				Demand demandData = (Demand) i.next();
				businessService.delDemand(demandData);
			}
			response.getWriter().write("{success:true}");
		}
	
	public void updateHistoryInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String ghGuestId = null;
		String ghRemark = null;
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		if ((String) request.getParameter("ghGuestId").trim() != null) {
			ghGuestId = (String) request.getParameter("ghGuestId").trim();
			log.info(ghGuestId);
		} else {
			log.info("ghGuestId is null");
			return;
		}
		if ((String) request.getParameter("ghRemark").trim() != null) {
			ghRemark = (String) request.getParameter("ghRemark").trim();
			log.info(ghRemark);
		} else {
			log.info("ghRemark is null");
			return;
		}
		GuestHistory guestHistory = businessService.queryHistoryInfo(ghGuestId);
		if(guestHistory==null){
			response.getWriter().write("{failure:true,reason:'未找到所要更新的信息'}");
		} else {
			guestHistory.setGhRemark(ghRemark);
			log.info(guestHistory.getGhRemark());
			boolean isUpdate = businessService.updateHistoryInfo(guestHistory);
			if(!isUpdate){
				response.getWriter().write("{failure:true,reason:'未更新成功'}");
			} else {
				response.getWriter().write("{success:true}");
			}
		}
	}
    /************************************************/
	public BusinessService getBusinessService() {
		return businessService;
	}

	public void setBusinessService(BusinessService businessService) {
		this.businessService = businessService;
	}
	
}
