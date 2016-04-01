package com.hotelmaster.po;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="tb_room")
public class Room {
	public static final String[] STATES = 
					{"空闲","预定","租用","结帐","清洁","锁房"};//客房状态数组
	public static final String[] COLORSTATES = {"#008CD2",
		"#FF7D00","#FFE000","#E40090","#00AF4D","#E80033"};//客房状态颜色数组
	public static final int STATE_VACANT = 0;		//空闲状态
	public static final int STATE_RESERVED = 1;		//预定状态
	public static final int STATE_RENTED = 2;		//租用状态
	public static final int STATE_CHECKOUT = 3;		//结账状态
	public static final int STATE_CLEANED = 4;		//清洁状态
	public static final int STATE_BLOCKED = 5;		//锁房状态
	
	private String rmId;			//客房编号
	private String rmArea;			//所属区域
	private String rmFloor;			//所属楼层
	private BigDecimal rmPrctPrice;	//实际价格 相对房间类型里统一设置的价格
	private String rmTelphone;		//分机电话
	private Integer rmState;		//客房状态
	private Boolean rmAvailable;	//是否可用
	private String rmCatalog;		//房间类别
	private String rmPicture;		//房间图片
	private BigDecimal rmPrctDiscount;//实际折扣 相对房间类型里统一设置的折扣
	@Id
    @Column(nullable=false, updatable=false, length=32)
	public String getRmId() {
		return rmId;
	}
	public void setRmId(String rmId) {
		this.rmId = rmId;
	}
	@Column(nullable=true, length=10)
	public String getRmArea() {
		return rmArea;
	}
	public void setRmArea(String rmArea) {
		this.rmArea = rmArea;
	}
	@Column(nullable=false, length=10)
	public String getRmFloor() {
		return rmFloor;
	}
	public void setRmFloor(String rmFloor) {
		this.rmFloor = rmFloor;
	}
	@Column(nullable=true)
	public BigDecimal getRmPrctPrice() {
		return rmPrctPrice;
	}
	public void setRmPrctPrice(BigDecimal rmPrctPrice) {
		this.rmPrctPrice = rmPrctPrice;
	}
	@Column(nullable=true,length=24)
	public String getRmTelphone() {
		return rmTelphone;
	}
	public void setRmTelphone(String rmTelphone) {
		this.rmTelphone = rmTelphone;
	}
	@Column(nullable=false)
	public Integer getRmState() {
		return rmState;
	}
	public void setRmState(Integer rmState) {
		this.rmState = rmState;
	}
	@Transient
    public String getRoomInfoStateAsColor() { 
		return COLORSTATES[rmState];
	}
	@Column(nullable=false)
	public Boolean getRmAvailable() {
		return rmAvailable;
	}
	public void setRmAvailable(Boolean rmAvailable) {
		this.rmAvailable = rmAvailable;
	}
	
	@Column(nullable=false, length=32)
	public String getRmCatalog() {
		return rmCatalog;
	}
	public void setRmCatalog(String rmCatalog) {
		this.rmCatalog = rmCatalog;
	}
	@Column(nullable=false, length=100)
	public String getRmPicture() {
		return rmPicture;
	}
	public void setRmPicture(String rmPicture) {
		this.rmPicture = rmPicture;
	}
	@Column(nullable=false)
	public BigDecimal getRmPrctDiscount() {
		return rmPrctDiscount;
	}
	public void setRmPrctDiscount(BigDecimal rmPrctDiscount) {
		this.rmPrctDiscount = rmPrctDiscount;
	}
	
}
