package com.hotelmaster.po;

import java.math.BigDecimal;
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

/**
 */
@Entity
@Table(name="tb_checkinorder")
public class CheckinOrder {				//入住登记订单类
	private String cioId;				//入住登记订单编号
	private List<CheckinItem> checkinItems;//入住登记信息列表
	private String cioGuestName;		//客人名称
	private Integer cioManNumber;		//人数
	private String cioGuestCatalog;		//客人类别
	private String cioGuestType;		//客人类型
	private String cioGroupName;		//团队名称
	private String cioGuestCardCatalog;	//客人证件类别
	private String cioGuestCardId;		//客人证件号码
	private String cioCause;			//事由
	private String cioState;			//登记状态
	private Timestamp cioInDateTime;	//客人入住时间
	private Timestamp cioPreOutDateTime;//预计离开时间
	private Timestamp cioPrctOutDateTime;//实际离开时间
	private String cioPaymentModel;		//支付类型
	private BigDecimal cioPaidMoney;	//已付押金
	private String cioIsReservId;		//有无预定
	private String cioOperator;			//操作员
	private String cioGuestGender;		//客人性别
	private BigDecimal cioTotalRate;	//总费用
	private BigDecimal cioBedRate;		//加床费
	private String cioOrderId;			//登记单号 
	@Id
    @Column(nullable=false, updatable=false, length=32)
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy="uuid")
	public String getCioId() {
		return cioId;
	}
	public void setCioId(String cioId) {
		this.cioId = cioId;
	}
	@OneToMany(targetEntity=CheckinItem.class,mappedBy="checkinOrder",cascade = CascadeType.ALL)
	public List<CheckinItem> getCheckinItems() {
		return checkinItems;
	}
	public void setCheckinItems(List<CheckinItem> checkinItems) {
		this.checkinItems = checkinItems;
	}
	@Column(nullable=false, length=20)
	public String getCioGuestName() {
		return cioGuestName;
	}
	public void setCioGuestName(String cioGuestName) {
		this.cioGuestName = cioGuestName;
	}
	@Column(nullable=false)
	public Integer getCioManNumber() {
		return cioManNumber;
	}
	public void setCioManNumber(Integer cioManNumber) {
		this.cioManNumber = cioManNumber;
	}
	@Column(nullable=false,length=16)
	public String getCioGuestCatalog() {
		return cioGuestCatalog;
	}
	public void setCioGuestCatalog(String cioGuestCatalog) {
		this.cioGuestCatalog = cioGuestCatalog;
	}
	@Column(nullable=false,length=16)
	public String getCioGuestType() {
		return cioGuestType;
	}
	public void setCioGuestType(String cioGuestType) {
		this.cioGuestType = cioGuestType;
	}
	@Column(nullable=true, length=32)
	public String getCioGroupName() {
		return cioGroupName;
	}
	public void setCioGroupName(String cioGroupName) {
		this.cioGroupName = cioGroupName;
	}
	@Column(nullable=false,length=16)
	public String getCioGuestCardCatalog() {
		return cioGuestCardCatalog;
	}
	public void setCioGuestCardCatalog(String cioGuestCardCatalog) {
		this.cioGuestCardCatalog = cioGuestCardCatalog;
	}
	@Column(nullable=false, length=32)
	public String getCioGuestCardId() {
		return cioGuestCardId;
	}
	public void setCioGuestCardId(String cioGuestCardId) {
		this.cioGuestCardId = cioGuestCardId;
	}
	@Column(nullable=true, length=100)
	public String getCioCause() {
		return cioCause;
	}
	public void setCioCause(String cioCause) {
		this.cioCause = cioCause;
	}
	//登记中 已入住 已结帐 已失效
	@Column(nullable=false)
	public String getCioState() {
		return cioState;
	}
	public void setCioState(String cioState) {
		this.cioState = cioState;
	}
	@Column(nullable=false)
	public Timestamp getCioInDateTime() {
		return cioInDateTime;
	}
	public void setCioInDateTime(Timestamp cioInDateTime) {
		this.cioInDateTime = cioInDateTime;
	}
	@Column(nullable=false)
	public Timestamp getCioPreOutDateTime() {
		return cioPreOutDateTime;
	}
	public void setCioPreOutDateTime(Timestamp cioPreOutDateTime) {
		this.cioPreOutDateTime = cioPreOutDateTime;
	}
	@Column(nullable=false)
	public Timestamp getCioPrctOutDateTime() {
		return cioPrctOutDateTime;
	}
	public void setCioPrctOutDateTime(Timestamp cioPrctOutDateTime) {
		this.cioPrctOutDateTime = cioPrctOutDateTime;
	}
	@Column(nullable=false,length=16)
	public String getCioPaymentModel() {
		return cioPaymentModel;
	}
	public void setCioPaymentModel(String cioPaymentModel) {
		this.cioPaymentModel = cioPaymentModel;
	}
	@Column(nullable=false)
	public BigDecimal getCioPaidMoney() {
		return cioPaidMoney;
	}
	public void setCioPaidMoney(BigDecimal cioPaidMoney) {
		this.cioPaidMoney = cioPaidMoney;
	}
	@Column(nullable=true, length=32)
	public String getCioIsReservId() {
		return cioIsReservId;
	}
	public void setCioIsReservId(String cioIsReservId) {
		this.cioIsReservId = cioIsReservId;
	}
	@Column(nullable=false, length=20)
	public String getCioOperator() {
		return cioOperator;
	}
	public void setCioOperator(String cioOperator) {
		this.cioOperator = cioOperator;
	}
	@Column(nullable=false,length=6)
	public String getCioGuestGender() {
		return cioGuestGender;
	}
	public void setCioGuestGender(String cioGuestGender) {
		this.cioGuestGender = cioGuestGender;
	}
	@Column(nullable=false)
	public BigDecimal getCioTotalRate() {
		return cioTotalRate;
	}
	public void setCioTotalRate(BigDecimal cioTotalRate) {
		this.cioTotalRate = cioTotalRate;
	}
	@Column(nullable=true)
	public BigDecimal getCioBedRate() {
		return cioBedRate;
	}
	public void setCioBedRate(BigDecimal cioBedRate) {
		this.cioBedRate = cioBedRate;
	}
	@Column(nullable=false,length=32)
	public String getCioOrderId() {
		return cioOrderId;
	}
	public void setCioOrderId(String cioOrderId) {
		this.cioOrderId = cioOrderId;
	}
	
}
