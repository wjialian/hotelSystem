package com.hotelmaster.po;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="tb_reservorder")
public class ReservOrder {
	private String roId;				//uupkid
	private List<ReservItem> reservItems;
	private String roGroupName;			//团队名称(协议单位)
	private String roGuestName;			//客人姓名
	private String roTelphone;			//电话
	private String roEmail;				//Email
	private String roFax;				//传真
	private Timestamp roInDateTime;		//预计住店日期
	private Time roEarliestTime;		//最早到达时间
	private Time roLatestTime;			//最晚到达时间
	private Timestamp roPreOutDateTime;	//预计离店时间
	private String roReservModel;		//预定方式
	private String roPaymentModel;		//支付方式
	private BigDecimal roPaidMoney;		//已付押金
	private String roRemark;			//备注
	private String roPreAssignRoom;		//预分房(备用)
	private String roReservState;		//预定状态
	private String roOperator;			//操作员
	private Timestamp roCreateTime;		//创建时间
	private String roGuestGender;		//客人性别
	private String roGuestCardCatalog;	//客人证件类型
	private String roGuestCardId;		//客人证件号码
	private BigDecimal roTotalRate;		//总费用
	private String  roOrderId;			//预定单ID
	
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getRoId() {
		return roId;
	}
	public void setRoId(String roId) {
		this.roId = roId;
	}
	@OneToMany(targetEntity=ReservItem.class,mappedBy="reservOrder",cascade = CascadeType.ALL)
	public List<ReservItem> getReservItems() {
		return reservItems;
	}
	public void setReservItems(List<ReservItem> reservItems) {
		this.reservItems = reservItems;
	}

	@Column(nullable=true, length=50)
	public String getRoGroupName() {
		return roGroupName;
	}
	public void setRoGroupName(String roGroupName) {
		this.roGroupName = roGroupName;
	}
	@Column(nullable=false, length=20)
	public String getRoGuestName() {
		return roGuestName;
	}
	public void setRoGuestName(String roGuestName) {
		this.roGuestName = roGuestName;
	}
	@Column(nullable=false, length=16)
	public String getRoTelphone() {
		return roTelphone;
	}
	public void setRoTelphone(String roTelphone) {
		this.roTelphone = roTelphone;
	}
	@Column(nullable=true, length=45)
	public String getRoEmail() {
		return roEmail;
	}
	public void setRoEmail(String roEmail) {
		this.roEmail = roEmail;
	}
	@Column(nullable=true)
	public String getRoFax() {
		return roFax;
	}
	public void setRoFax(String roFax) {
		this.roFax = roFax;
	}
	@Column(nullable=false)
	public Timestamp getRoInDateTime() {
		return roInDateTime;
	}
	public void setRoInDateTime(Timestamp roInDateTime) {
		this.roInDateTime = roInDateTime;
	}
	@Column(nullable=true)
	public Time getRoEarliestTime() {
		return roEarliestTime;
	}
	public void setRoEarliestTime(Time roEarliestTime) {
		this.roEarliestTime = roEarliestTime;
	}
	@Column(nullable=true)
	public Time getRoLatestTime() {
		return roLatestTime;
	}
	public void setRoLatestTime(Time roLatestTime) {
		this.roLatestTime = roLatestTime;
	}
	@Column(nullable=false)
	public Timestamp getRoPreOutDateTime() {
		return roPreOutDateTime;
	}
	public void setRoPreOutDateTime(Timestamp roPreOutDateTime) {
		this.roPreOutDateTime = roPreOutDateTime;
	}
	@Column(nullable=false)
	public String getRoReservModel() {
		return roReservModel;
	}
	public void setRoReservModel(String roReservModel) {
		this.roReservModel = roReservModel;
	}
	@Column(nullable=false)
	public String getRoPaymentModel() {
		return roPaymentModel;
	}
	public void setRoPaymentModel(String roPaymentModel) {
		this.roPaymentModel = roPaymentModel;
	}
	@Column(nullable=false)
	public BigDecimal getRoPaidMoney() {
		return roPaidMoney;
	}
	public void setRoPaidMoney(BigDecimal roPaidMoney) {
		this.roPaidMoney = roPaidMoney;
	}
	@Column(nullable=true, length=200)
	public String getRoRemark() {
		return roRemark;
	}
	public void setRoRemark(String roRemark) {
		this.roRemark = roRemark;
	}
	@Column(nullable=true, length=32)
	public String getRoPreAssignRoom() {
		return roPreAssignRoom;
	}
	public void setRoPreAssignRoom(String roPreAssignRoom) {
		this.roPreAssignRoom = roPreAssignRoom;
	}
	@Column(nullable=false)
	public String getRoReservState() {
		return roReservState;
	}
	public void setRoReservState(String roReservState) {
		this.roReservState = roReservState;
	}
	@Column(nullable=false, length=32)
	public String getRoOperator() {
		return roOperator;
	}
	public void setRoOperator(String roOperator) {
		this.roOperator = roOperator;
	}
	@Column(nullable=false,updatable=false)
	public Timestamp getRoCreateTime() {
		return roCreateTime;
	}
	public void setRoCreateTime(Timestamp roCreateTime) {
		this.roCreateTime = roCreateTime;
	}
	@Column(nullable=false,length=6)
	public String getRoGuestGender() {
		return roGuestGender;
	}
	public void setRoGuestGender(String roGuestGender) {
		this.roGuestGender = roGuestGender;
	}
	@Column(nullable=true,length=16)
	public String getRoGuestCardCatalog() {
		return roGuestCardCatalog;
	}
	public void setRoGuestCardCatalog(String roGuestCardCatalog) {
		this.roGuestCardCatalog = roGuestCardCatalog;
	}
	@Column(nullable=true,length=32)
	public String getRoGuestCardId() {
		return roGuestCardId;
	}
	public void setRoGuestCardId(String roGuestCardId) {
		this.roGuestCardId = roGuestCardId;
	}
	@Column(nullable=false)
	public BigDecimal getRoTotalRate() {
		return roTotalRate;
	}
	public void setRoTotalRate(BigDecimal roTotalRate) {
		this.roTotalRate = roTotalRate;
	}
	@Column(nullable=false,length=32)
	public String getRoOrderId() {
		return roOrderId;
	}
	public void setRoOrderId(String roOrderId) {
		this.roOrderId = roOrderId;
	}
	
}
