package com.hotelmaster.po;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 */
@Entity
@Table(name="tb_demand")
public class Demand {
	private String gcID;				//
	private String gcDETAIL;		
	private Timestamp gcTIME;			//
	private String gcNAME;				//
	
	@Id
    @Column(nullable=false, updatable=false, length=20)
	public String getGcID() {
		return gcID;
	}
	public void setGcID(String gcID) {
		this.gcID = gcID;
	}
	@Column(nullable=true, length=200)
	public String getGcDETAIL() {
		return gcDETAIL;
	}
	public void setGcDETAIL(String gcDETAIL) {
		this.gcDETAIL = gcDETAIL;
	}
	@Column(nullable=true)
	public Timestamp getGcTIME() {
		return gcTIME;
	}
	public void setGcTIME(Timestamp gcTIME) {
		this.gcTIME = gcTIME;
	}
	@Column(nullable=true, length=32)
	public String getGcNAME() {
		return gcNAME;
	}
	public void setGcNAME(String gcNAME) {
		this.gcNAME = gcNAME;
	}

	

}
