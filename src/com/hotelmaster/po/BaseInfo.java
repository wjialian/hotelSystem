package com.hotelmaster.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="tb_baseinfo")
public class BaseInfo {
	private String bioId;	//PKId
	private String bioName;	//信息名称
	private String bioValue;	//信息值
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getBioId() {
		return bioId;
	}
	public void setBioId(String bioId) {
		this.bioId = bioId;
	}
	@Column(nullable=false,length=32)
	public String getBioName() {
		return bioName;
	}
	public void setBioName(String bioName) {
		this.bioName = bioName;
	}
	@Column(nullable=false,length=200)
	public String getBioValue() {
		return bioValue;
	}
	public void setBioValue(String bioValue) {
		this.bioValue = bioValue;
	}
	
}
