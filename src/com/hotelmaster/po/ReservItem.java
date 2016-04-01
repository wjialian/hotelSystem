package com.hotelmaster.po;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 */
@Entity
@Table(name="tb_reservitem")
public class ReservItem {
	private String rimId;				//uupkid
	private ReservOrder reservOrder;
	private Room room;
	//private String rimReservId;			//预定单id
	//private String rimRoomId;			//房间id
	//private String rimRoomPrice			//房间单价
	private Timestamp rimInDateTime;	//入住时间
	private Timestamp rimOutDateTime;	//离开时间
	private String rimState;			//状态(是否已确定的预定,房间将强制预留)
	
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getRimId() {
		return rimId;
	}
	public void setRimId(String rimId) {
		this.rimId = rimId;
	}
	@ManyToOne//(cascade = CascadeType.ALL)
    @JoinColumn(nullable=false, updatable=false)
	public ReservOrder getReservOrder() {
		return reservOrder;
	}
	public void setReservOrder(ReservOrder reservOrder) {
		this.reservOrder = reservOrder;
	}
	@ManyToOne//(cascade = CascadeType.ALL)
	@JoinColumn(nullable=false, updatable=false)
	public Room getRoom() {
		return room;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	/*@Column(nullable=false, length=32)
	public String getRimReservId() {
		return rimReservId;
	}
	public void setRimReservId(String rimReservId) {
		this.rimReservId = rimReservId;
	}
	@Column(nullable=false, length=32)
	public String getRimRoomId() {
		return rimRoomId;
	}
	public void setRimRoomId(String rimRoomId) {
		this.rimRoomId = rimRoomId;
	}*/
	@Column(nullable=false)
	public Timestamp getRimInDateTime() {
		return rimInDateTime;
	}
	public void setRimInDateTime(Timestamp rimInDateTime) {
		this.rimInDateTime = rimInDateTime;
	}
	@Column(nullable=false)
	public Timestamp getRimOutDateTime() {
		return rimOutDateTime;
	}
	public void setRimOutDateTime(Timestamp rimOutDateTime) {
		this.rimOutDateTime = rimOutDateTime;
	}
	@Column(nullable=false,length=16)
	public String getRimState() {
		return rimState;
	}
	public void setRimState(String rimState) {
		this.rimState = rimState;
	}
    
}
