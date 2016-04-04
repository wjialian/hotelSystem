package com.hotelmaster.po;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 */
@Entity
@Table(name="tb_roomcatalog")
public class RoomCatalog {
	private String rcId;				//客房类型编号
	private String rcName;				//客房类型代号
	private String rcBedNumber;		    //客房类型名称
	private BigDecimal rcPrePrice;		//预定价格
	private BigDecimal rcPreDiscount;	//预定折扣
	private BigDecimal rcHourBasePrice;	//计时最低价
	private BigDecimal rcPerHourPrice;	//计时每小时价
	
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getRcId() {
		return rcId;
	}
	public void setRcId(String rcId) {
		this.rcId = rcId;
	}
	@Column(nullable=false, length=12)
	public String getRcName() {
		return rcName;
	}
	public void setRcName(String rcName) {
		this.rcName = rcName;
	}
	@Column(nullable=false)
	public String getRcBedNumber() {
		return rcBedNumber;
	}
	public void setRcBedNumber(String rcBedNumber) {
		this.rcBedNumber = rcBedNumber;
	}
	@Column(nullable=false)
	public BigDecimal getRcPrePrice() {
		return rcPrePrice;
	}
	public void setRcPrePrice(BigDecimal rcPrePrice) {
		this.rcPrePrice = rcPrePrice;
	}
	@Column(nullable=true)
	public BigDecimal getRcPreDiscount() {
		return rcPreDiscount;
	}
	public void setRcPreDiscount(BigDecimal rcPreDiscount) {
		this.rcPreDiscount = rcPreDiscount;
	}
	@Column(nullable=true)
	public BigDecimal getRcHourBasePrice() {
		return rcHourBasePrice;
	}
	public void setRcHourBasePrice(BigDecimal rcHourBasePrice) {
		this.rcHourBasePrice = rcHourBasePrice;
	}
	@Column(nullable=true)
	public BigDecimal getRcPerHourPrice() {
		return rcPerHourPrice;
	}
	public void setRcPerHourPrice(BigDecimal rcPerHourPrice) {
		this.rcPerHourPrice = rcPerHourPrice;
	}
    
}
