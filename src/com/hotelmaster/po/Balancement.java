package com.hotelmaster.po;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="tb_balancement")
public class Balancement {			//结账信息类
	private String bmId;			//结账信息编号
	private String bmCheckinOrderId;//入住登记订单编号
	private String bmGuestId;		//客人编号
	private String bmType;			//结账类型
	private BigDecimal bmTotalRate;	//应收金额
	private BigDecimal bmPaidMoney;	//已付押金
	private BigDecimal bmReceivMoney;//续收金额
	private Timestamp bmCreateTime;	//创建时间
	private String bmOperator;		//操作员
	private String bmPaymentModel;	//支付类型
	private String bmRemark;		//结账说明
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getBmId() {
		return bmId;
	}
	public void setBmId(String bmId) {
		this.bmId = bmId;
	}
	@Column(nullable=false,length=32)
	public String getBmCheckinOrderId() {
		return bmCheckinOrderId;
	}
	public void setBmCheckinOrderId(String bmCheckinOrderId) {
		this.bmCheckinOrderId = bmCheckinOrderId;
	}
	@Column(nullable=true,length=32)
	public String getBmGuestId() {
		return bmGuestId;
	}
	public void setBmGuestId(String bmGuestId) {
		this.bmGuestId = bmGuestId;
	}
	@Column(nullable=false,length=16)
	public String getBmType() {
		return bmType;
	}
	public void setBmType(String bmType) {
		this.bmType = bmType;
	}
	@Column(nullable=false)
	public BigDecimal getBmTotalRate() {
		return bmTotalRate;
	}
	public void setBmTotalRate(BigDecimal bmTotalRate) {
		this.bmTotalRate = bmTotalRate;
	}
	@Column(nullable=false)
	public BigDecimal getBmPaidMoney() {
		return bmPaidMoney;
	}
	public void setBmPaidMoney(BigDecimal bmPaidMoney) {
		this.bmPaidMoney = bmPaidMoney;
	}
	@Column(nullable=false)
	public BigDecimal getBmReceivMoney() {
		return bmReceivMoney;
	}
	public void setBmReceivMoney(BigDecimal bmReceivMoney) {
		this.bmReceivMoney = bmReceivMoney;
	}
	@Column(nullable=false)
	public Timestamp getBmCreateTime() {
		return bmCreateTime;
	}
	public void setBmCreateTime(Timestamp bmCreateTime) {
		this.bmCreateTime = bmCreateTime;
	}
	@Column(nullable=false,length=20)
	public String getBmOperator() {
		return bmOperator;
	}
	public void setBmOperator(String bmOperator) {
		this.bmOperator = bmOperator;
	}
	@Column(nullable=false,length=16)
	public String getBmPaymentModel() {
		return bmPaymentModel;
	}
	public void setBmPaymentModel(String bmPaymentModel) {
		this.bmPaymentModel = bmPaymentModel;
	}
	@Column(nullable=true,length=100)
	public String getBmRemark() {
		return bmRemark;
	}
	public void setBmRemark(String bmRemark) {
		this.bmRemark = bmRemark;
	}
	
}
