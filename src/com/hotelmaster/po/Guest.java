package com.hotelmaster.po;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="tb_guest")
public class Guest {				//顾客信息类
	private String gtId;			//客人编号
	private String gtName;			//客人姓名
	private String gtType;			//客人类型
	private String gtCardCatalog;	//客人证件类别
	private String gtCardId;		//客人证件号码
	private String gtCountry;		//国籍
	private String gtAddress;		//地址
	private String gtZip;			//邮编
	private String gtCompany;		//公司(工作单位)
	private String gtTelphone;		//固定电话
	private String gtMobile;		//手机
	private String gtGender;		//性别
	private String gtEmail;			//Email地址
	private Timestamp gtCreateTime;	//资料创建时间
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getGtId() {
		return gtId;
	}
	public void setGtId(String gtId) {
		this.gtId = gtId;
	}
	@Column(nullable=false, length=20)
	public String getGtName() {
		return gtName;
	}
	public void setGtName(String gtName) {
		this.gtName = gtName;
	}
	@Column(nullable=false)
	public String getGtType() {
		return gtType;
	}
	public void setGtType(String gtType) {
		this.gtType = gtType;
	}
	@Column(nullable=false,length=16)
	public String getGtCardCatalog() {
		return gtCardCatalog;
	}
	public void setGtCardCatalog(String gtCardCatalog) {
		this.gtCardCatalog = gtCardCatalog;
	}
	@Column(nullable=false,length=32)
	public String getGtCardId() {
		return gtCardId;
	}
	public void setGtCardId(String gtCardId) {
		this.gtCardId = gtCardId;
	}
	@Column(nullable=true,length=32)
	public String getGtCountry() {
		return gtCountry;
	}
	public void setGtCountry(String gtCountry) {
		this.gtCountry = gtCountry;
	}
	@Column(nullable=true,length=100)
	public String getGtAddress() {
		return gtAddress;
	}
	public void setGtAddress(String gtAddress) {
		this.gtAddress = gtAddress;
	}
	@Column(nullable=true,length=10)
	public String getGtZip() {
		return gtZip;
	}
	public void setGtZip(String gtZip) {
		this.gtZip = gtZip;
	}
	@Column(nullable=true,length=50)
	public String getGtCompany() {
		return gtCompany;
	}
	public void setGtCompany(String gtCompany) {
		this.gtCompany = gtCompany;
	}
	@Column(nullable=true,length=16)
	public String getGtTelphone() {
		return gtTelphone;
	}
	public void setGtTelphone(String gtTelphone) {
		this.gtTelphone = gtTelphone;
	}
	@Column(nullable=true,length=16)
	public String getGtMobile() {
		return gtMobile;
	}
	public void setGtMobile(String gtMobile) {
		this.gtMobile = gtMobile;
	}
	@Column(nullable=false,length=4)
	public String getGtGender() {
		return gtGender;
	}
	public void setGtGender(String gtGender) {
		this.gtGender = gtGender;
	}
	@Column(nullable=true,length=32)
	public String getGtEmail() {
		return gtEmail;
	}
	public void setGtEmail(String gtEmail) {
		this.gtEmail = gtEmail;
	}
	@Column(nullable=false)
	public Timestamp getGtCreateTime() {
		return gtCreateTime;
	}
	public void setGtCreateTime(Timestamp gtCreateTime) {
		this.gtCreateTime = gtCreateTime;
	}
}
