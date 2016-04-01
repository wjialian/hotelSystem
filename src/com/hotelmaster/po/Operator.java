package com.hotelmaster.po;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 */
@Entity
@Table(name="tb_operator")
public class Operator{
    public static final int PRIVILEGE_USER = 0;		//普通操作员
    public static final int PRIVILEGE_ADMIN = 0xff;	//管理员
	private String opUserName;		//操作员用户名(自定义)
	private String opPassword;		//操作员密码
	private Integer opPrivilege;	//操作员权限
	private String opAddress;		//地址
	private String opName;			//姓名
	private String opTelephone;		//电话
	private String opMobile;		//手机
	private String opZip;			//邮编
	private Timestamp opCreateTime;	//创建时间
	@Id
    @Column(updatable=false, nullable=false, length=20)
	//@Pattern(regex="[a-z0-9]{3,20}", message="用户名只能由英文字母和数字构成，长度为3-20个字符")
	public String getOpUserName() {
		return opUserName;
	}
	public void setOpUserName(String opUserName) {
		this.opUserName = opUserName;
	}
	@Column(nullable=false, length=32)
	public String getOpPassword() {
		return opPassword;
	}
	public void setOpPassword(String opPassword) {
		this.opPassword = opPassword;
	}
	@Column(nullable=false)
	public Integer getOpPrivilege() {
		return opPrivilege;
	}
	public void setOpPrivilege(Integer opPrivilege) {
		this.opPrivilege = opPrivilege;
	}
	@Column(nullable=true,length=100)
	public String getOpAddress() {
		return opAddress;
	}
	public void setOpAddress(String opAddress) {
		this.opAddress = opAddress;
	}
	@Column(nullable=false,length=20)
	public String getOpName() {
		return opName;
	}
	public void setOpName(String opName) {
		this.opName = opName;
	}
	@Column(nullable=true,length=16)
	public String getOpTelephone() {
		return opTelephone;
	}
	public void setOpTelephone(String opTelephone) {
		this.opTelephone = opTelephone;
	}
	@Column(nullable=true,length=16)
	public String getOpMobile() {
		return opMobile;
	}
	public void setOpMobile(String opMobile) {
		this.opMobile = opMobile;
	}
	@Column(nullable=true,length=10)
	public String getOpZip() {
		return opZip;
	}
	public void setOpZip(String opZip) {
		this.opZip = opZip;
	}
	@Column(nullable=false)
	public Timestamp getOpCreateTime() {
		return opCreateTime;
	}
	public void setOpCreateTime(Timestamp opCreateTime) {
		this.opCreateTime = opCreateTime;
	}
}
