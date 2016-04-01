package com.hotelmaster.po;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class description goes here.
 * 
 * @
 * @Date Apr 17, 2008
 */
@Entity
@Table(name="tb_checkinitem")
public class CheckinItem {				//入住登记信息类
	private String cimId;				//入住登记信息	编号
	private CheckinOrder checkinOrder;	//入住登记订单
	private Room room;					//入住房间
    private BigDecimal cimPrctPrice;	//实际价格
    private BigDecimal cimDiscount;		//折扣
    private Timestamp cimInDatetime;	//入住时间
    private Timestamp cimOutDatetime;	//离开时间
    private String cimState;			//登记状态
    
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getCimId() {
		return cimId;
	}
	public void setCimId(String cimId) {
		this.cimId = cimId;
	}
	
	/*@Column(nullable=false,length=32)
	public String getCimCheckinId() {
		return cimCheckinId;
	}
	public void setCimCheckinId(String cimCheckinId) {
		this.cimCheckinId = cimCheckinId;
	}
	@Column(nullable=false,length=32)
	public String getCimRoomId() {
		return cimRoomId;
	}
	public void setCimRoomId(String cimRoomId) {
		this.cimRoomId = cimRoomId;
	}*/
	@ManyToOne
    @JoinColumn(nullable=false, updatable=false)
	public CheckinOrder getCheckinOrder() {
		return checkinOrder;
	}
	public void setCheckinOrder(CheckinOrder checkinOrder) {
		this.checkinOrder = checkinOrder;
	}
	@ManyToOne
	@JoinColumn(nullable=false, updatable=false)
	public Room getRoom() {
		return room;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	@Column(nullable=false)
	public BigDecimal getCimPrctPrice() {
		return cimPrctPrice;
	}
	public void setCimPrctPrice(BigDecimal cimPrctPrice) {
		this.cimPrctPrice = cimPrctPrice;
	}
	/*@Column(nullable=true)
	public BigDecimal getCimServiceRate() {
		return cimServiceRate;
	}
	public void setCimServiceRate(BigDecimal cimServiceRate) {
		this.cimServiceRate = cimServiceRate;
	}
	@Column(nullable=true)
	public BigDecimal getCimAddRate() {
		return cimAddRate;
	}
	public void setCimAddRate(BigDecimal cimAddRate) {
		this.cimAddRate = cimAddRate;
	}
	@Column(nullable=true)
	public BigDecimal getCimBedRate() {
		return cimBedRate;
	}
	public void setCimBedRate(BigDecimal cimBedRate) {
		this.cimBedRate = cimBedRate;
	}*/
	@Column(nullable=true)
	public BigDecimal getCimDiscount() {
		return cimDiscount;
	}
	public void setCimDiscount(BigDecimal cimDiscount) {
		this.cimDiscount = cimDiscount;
	}
	@Column(nullable=false)
	public Timestamp getCimInDatetime() {
		return cimInDatetime;
	}
	public void setCimInDatetime(Timestamp cimInDatetime) {
		this.cimInDatetime = cimInDatetime;
	}
	@Column(nullable=false)
	public Timestamp getCimOutDatetime() {
		return cimOutDatetime;
	}
	public void setCimOutDatetime(Timestamp cimOutDatetime) {
		this.cimOutDatetime = cimOutDatetime;
	}
	@Column(nullable=false,length=16)	
	public String getCimState() {
		return cimState;
	}
	public void setCimState(String cimState) {
		this.cimState = cimState;
	}
    
}
