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
@Table(name="tb_floor")
public class Floor {
	private String floorId;				//楼层号
	private String flRoomNum;				//楼层房间数
	private String flPic;					//楼层平面图
	
	@Id
    @Column(nullable=false, updatable=false, length=20)
	public String getfloorId() {
		return floorId;
	}
	public void setfloorId(String floorId) {
		this.floorId = floorId;
	}
	@Column(nullable=false, length=20)
	public String getflRoomNum() {
		return flRoomNum;
	}
	public void setflRoomNum(String flRoomNum) {
		this.flRoomNum = flRoomNum;
	}
	@Column(nullable=false, length=100)
	public String getflPic() {
		return flPic;
	}
	public void setflPic(String flPic) {
		this.flPic = flPic;
	}
    
}
