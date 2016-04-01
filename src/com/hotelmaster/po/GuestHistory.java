package com.hotelmaster.po;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="tb_guesthistory")
public class GuestHistory {
	private String ghId;				//uupkid
	//private Integer ghOrderType;		//Order类型(预定，登记...)
	private String ghBalancementId;			//OrderId
	private String ghGuestId;		//客人id(uupkid)
	private String ghGuestName;
	private String ghRemark;
	//private Integer ghState;			//Order状态(有无成功完成交易)
	//private BigDecimal ghTotalConsume;	//消费额
										//时间等由orderid查询
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getGhId() {
		return ghId;
	}
	public void setGhId(String ghId) {
		this.ghId = ghId;
	}
	/*@Column(nullable=false)
	public Integer getGhOrderType() {
		return ghOrderType;
	}
	public void setGhOrderType(Integer ghOrderType) {
		this.ghOrderType = ghOrderType;
	}*/
	@Column(nullable=false,length=32)
	public String getGhBalancementId() {
		return ghBalancementId;
	}
	public void setGhBalancementId(String ghBalancementId) {
		this.ghBalancementId = ghBalancementId;
	}
	@Column(nullable=false,length=32)
	public String getGhGuestId() {
		return ghGuestId;
	}
	public void setGhGuestId(String ghGuestId) {
		this.ghGuestId = ghGuestId;
	}
	@Column(nullable=true,length=32)
	public String getGhGuestName() {
		return ghGuestName;
	}
	public void setGhGuestName(String ghGuestName) {
		this.ghGuestName = ghGuestName;
	}
	@Column(nullable=true)
	public String getGhRemark() {
		return ghRemark;
	}
	public void setGhRemark(String ghRemark) {
		this.ghRemark = ghRemark;
	}

	/*public Integer getGhState() {
		return ghState;
	}
	public void setGhState(Integer ghState) {
		this.ghState = ghState;
	}
	@Column(nullable=false)
	public BigDecimal getGhTotalConsume() {
		return ghTotalConsume;
	}
	public void setGhTotalConsume(BigDecimal ghTotalConsume) {
		this.ghTotalConsume = ghTotalConsume;
	}*/
    
}
