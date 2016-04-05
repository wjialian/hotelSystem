/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : hotel

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2016-04-05 10:08:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_balancement
-- ----------------------------
DROP TABLE IF EXISTS `tb_balancement`;
CREATE TABLE `tb_balancement` (
  `BMID` varchar(32) NOT NULL,
  `BMCHECKINORDERID` varchar(32) NOT NULL,
  `BMGUESTID` varchar(32) DEFAULT NULL,
  `BMTYPE` varchar(16) NOT NULL,
  `BMTOTALRATE` decimal(14,2) NOT NULL,
  `BMPAIDMONEY` decimal(14,2) NOT NULL,
  `BMRECEIVMONEY` decimal(14,2) NOT NULL,
  `BMCREATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `BMOPERATOR` varchar(20) NOT NULL,
  `BMPAYMENTMODEL` varchar(16) NOT NULL,
  `BMREMARK` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`BMID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_balancement
-- ----------------------------
INSERT INTO `tb_balancement` VALUES ('402881e51a448696011a4489783f0003', '402881e51a448696011a4489373e0001', '402881e51a39c232011a39da4d3e0005', '', '320.00', '1000.00', '200.00', '2008-06-01 22:30:37', 'admin', '', 'remark');
INSERT INTO `tb_balancement` VALUES ('402881e51a53efae011a53f874550004', '402881e51a53efae011a53f77fc40001', '402881e51a39c232011a39da4d3e0005', '', '350.00', '0.00', '0.00', '2008-06-04 22:26:09', 'admin', '', 'fdsafdsa');
INSERT INTO `tb_balancement` VALUES ('402881e625636b70012563767c6c0001', '402881e625587aa7012559003f2d0003', '402881e625587aa7012558e59ffa0001', '', '260.00', '0.00', '0.00', '2009-12-06 18:08:47', 'admin', '', '');

-- ----------------------------
-- Table structure for tb_baseinfo
-- ----------------------------
DROP TABLE IF EXISTS `tb_baseinfo`;
CREATE TABLE `tb_baseinfo` (
  `BIOID` varchar(32) NOT NULL,
  `BIONAME` varchar(32) NOT NULL,
  `BIOVALUE` varchar(200) NOT NULL,
  PRIMARY KEY (`BIOID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_baseinfo
-- ----------------------------
INSERT INTO `tb_baseinfo` VALUES ('BIO0011234', 'CheckinOrderID', '13');
INSERT INTO `tb_baseinfo` VALUES ('BIO0011323', 'ReservOrderID', '14');
INSERT INTO `tb_baseinfo` VALUES ('BIO0056859', 'ReservUpdated', '2008-06-05 00:52:57.375');

-- ----------------------------
-- Table structure for tb_checkinitem
-- ----------------------------
DROP TABLE IF EXISTS `tb_checkinitem`;
CREATE TABLE `tb_checkinitem` (
  `CIMID` varchar(32) NOT NULL,
  `CHECKINORDER_CIOID` varchar(32) NOT NULL,
  `ROOM_RMID` varchar(32) NOT NULL,
  `CIMPRCTPRICE` decimal(14,2) NOT NULL,
  `CIMDISCOUNT` decimal(5,2) DEFAULT '100.00',
  `CIMINDATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `CIMOUTDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CIMSTATE` varchar(16) NOT NULL,
  PRIMARY KEY (`CIMID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_checkinitem
-- ----------------------------
INSERT INTO `tb_checkinitem` VALUES ('402881e51a448696011a4489376d0002', '402881e51a448696011a4489373e0001', '8109', '320.00', '100.00', '2008-06-01 21:15:00', '2008-06-02 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e51a53efae011a53f77fd30002', '402881e51a53efae011a53f77fc40001', '8308', '100.00', '31.25', '2008-06-04 22:24:00', '2008-06-05 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e51a53efae011a53f77fd30003', '402881e51a53efae011a53f77fc40001', '8209', '250.00', '96.15', '2008-06-04 22:24:00', '2008-06-05 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e51a579a4b011a57d29eb50004', '402881e51a579a4b011a57d29ea50003', '8208', '320.00', '100.00', '2008-06-05 16:22:00', '2008-06-06 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e5267907ec01267915e3390005', '402881e5267907ec01267915e32e0004', '8101', '260.00', '100.00', '2010-01-29 15:53:00', '2010-01-30 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e6254e53a001254e58d94e0002', '402881e6254e53a001254e58d93e0001', '8106', '260.00', '100.00', '2009-12-02 15:43:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e6254e53a001254e58d94e0003', '402881e6254e53a001254e58d93e0001', '8107', '0.00', '0.00', '2009-12-02 15:43:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e6254e53a001254e5be9230005', '402881e6254e53a001254e5be9230004', '8118', '260.00', '100.00', '2009-12-02 15:46:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e6254e53a001254e64b91d0008', '402881e6254e53a001254e64b91d0007', '8106', '260.00', '100.00', '2009-12-02 15:54:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e625587aa7012559003f440004', '402881e625587aa7012559003f2d0003', '8104', '260.00', '100.00', '2009-12-04 15:55:00', '2009-12-05 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('402881e625587aa70125590883f60006', '402881e625587aa70125590883f60005', '8103', '260.00', '100.00', '2009-12-04 15:55:00', '2009-12-05 12:00:00', '');
INSERT INTO `tb_checkinitem` VALUES ('4028831d5383e5980153845e488c0003', '4028831d5383e5980153845e48890002', '8104', '260.00', '100.00', '2016-03-17 17:26:00', '2016-03-18 12:00:00', '???');
INSERT INTO `tb_checkinitem` VALUES ('402883e8539cbb3701539cbca0710002', '402883e8539cbb3701539cbca0530001', '8109', '320.00', '100.00', '2016-03-22 13:11:00', '2016-03-23 12:00:00', '???');
INSERT INTO `tb_checkinitem` VALUES ('402883fa53b164570153b16d298a0003', '402883fa53b164570153b16d298a0002', '8101', '260.00', '100.00', '2016-03-26 17:26:00', '2016-03-27 12:00:00', '???');
INSERT INTO `tb_checkinitem` VALUES ('ff808081012a13dc01012a1aff9b0002', 'ff808081012a13dc01012a1aff7c0001', '8109', '320.00', '100.00', '2005-01-01 01:06:00', '2005-01-02 12:00:00', '');

-- ----------------------------
-- Table structure for tb_checkinorder
-- ----------------------------
DROP TABLE IF EXISTS `tb_checkinorder`;
CREATE TABLE `tb_checkinorder` (
  `CIOID` varchar(32) NOT NULL,
  `CIOGUESTNAME` varchar(20) NOT NULL,
  `CIOMANNUMBER` int(10) unsigned NOT NULL,
  `CIOGUESTCATALOG` varchar(16) NOT NULL,
  `CIOGUESTTYPE` varchar(16) NOT NULL,
  `CIOGROUPNAME` varchar(32) DEFAULT NULL,
  `CIOGUESTCARDCATALOG` varchar(16) NOT NULL,
  `CIOGUESTCARDID` varchar(32) NOT NULL,
  `CIOCAUSE` varchar(100) DEFAULT NULL,
  `CIOSTATE` varchar(16) NOT NULL,
  `CIOINDATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CIOPREOUTDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CIOPRCTOUTDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CIOPAYMENTMODEL` varchar(16) NOT NULL,
  `CIOPAIDMONEY` decimal(14,2) NOT NULL,
  `CIOISRESERVID` varchar(32) DEFAULT NULL,
  `CIOOPERATOR` varchar(20) NOT NULL,
  `CIOGUESTGENDER` varchar(6) NOT NULL,
  `CIOTOTALRATE` decimal(14,2) NOT NULL,
  `CIOBEDRATE` decimal(14,2) DEFAULT NULL,
  `CIOORDERID` varchar(32) NOT NULL,
  PRIMARY KEY (`CIOID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_checkinorder
-- ----------------------------
INSERT INTO `tb_checkinorder` VALUES ('402881e51a448696011a4489373e0001', 'esperamier', '2', 'ɢ', '', null, '', '362422198611160012', null, '', '2008-06-01 21:15:00', '2008-06-02 12:00:00', '2008-06-01 22:30:37', '', '0.00', null, 'FoGhost', '', '320.00', '0.00', 'CIO00000001');
INSERT INTO `tb_checkinorder` VALUES ('402881e51a53efae011a53f77fc40001', 'esperamier', '2', 'ɢ', '', null, '', '362422198611160012', null, '', '2008-06-04 22:24:00', '2008-06-05 12:00:00', '2008-06-04 22:26:09', '', '0.00', null, 'FoGhost', '', '350.00', '0.00', 'CIO00000001');
INSERT INTO `tb_checkinorder` VALUES ('402881e51a579a4b011a57d29ea50003', 'esperamier', '2', 'ɢ', '', null, '', '362422198611160012', null, '', '2008-06-05 16:22:00', '2008-06-06 12:00:00', '2008-06-06 12:00:00', '', '0.00', null, 'Admin', '', '320.00', '0.00', 'CIO00000002');
INSERT INTO `tb_checkinorder` VALUES ('402881e5267907ec01267915e32e0004', '', '2', 'ɢ', '', null, '', '123456789789123', null, '', '2010-01-29 15:53:00', '2010-01-30 12:00:00', '2010-01-30 12:00:00', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000009');
INSERT INTO `tb_checkinorder` VALUES ('402881e6254e53a001254e58d93e0001', '', '2', 'ɢ', '', null, '', '1234567891234567', null, '', '2009-12-02 15:43:00', '2009-12-03 12:00:00', '2009-12-03 12:00:00', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000004');
INSERT INTO `tb_checkinorder` VALUES ('402881e6254e53a001254e5be9230004', '', '2', 'ɢ', '', null, '', '12345678945465151', null, '', '2009-12-02 15:46:00', '2009-12-03 12:00:00', '2009-12-03 12:00:00', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000005');
INSERT INTO `tb_checkinorder` VALUES ('402881e6254e53a001254e64b91d0007', '', '2', 'ɢ', '', null, '', '123456789123456', null, '', '2009-12-02 15:54:00', '2009-12-03 12:00:00', '2009-12-03 12:00:00', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000006');
INSERT INTO `tb_checkinorder` VALUES ('402881e625587aa7012559003f2d0003', '', '2', 'ɢ', '', null, '', '123456789789456', null, '', '2009-12-04 15:55:00', '2009-12-05 12:00:00', '2009-12-06 18:08:47', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000007');
INSERT INTO `tb_checkinorder` VALUES ('402881e625587aa70125590883f60005', '', '2', 'ɢ', '', null, '', '123456789789456', null, '', '2009-12-04 15:55:00', '2009-12-05 12:00:00', '2009-12-05 12:00:00', '', '0.00', null, 'Admin', '', '260.00', '0.00', 'CIO00000008');
INSERT INTO `tb_checkinorder` VALUES ('4028831d5383e5980153845e48890002', '', '2', '??', '????', null, '???', '123456789123456', null, '???', '2016-03-17 17:26:00', '2016-03-18 12:00:00', '2016-03-18 12:00:00', '??', '0.00', null, 'Admin', '?', '260.00', '0.00', 'CIO00000010');
INSERT INTO `tb_checkinorder` VALUES ('402883e8539cbb3701539cbca0530001', '???', '2', '??', '????', null, '???', '350204199999999', null, '???', '2016-03-22 13:11:00', '2016-03-23 12:00:00', '2016-03-23 12:00:00', '??', '0.00', null, 'Admin', '?', '320.00', '0.00', 'CIO00000011');
INSERT INTO `tb_checkinorder` VALUES ('402883fa53b164570153b16d298a0002', 'zhuyuan', '2', '??', '????', null, '???', '332564673332113', null, '???', '2016-03-26 17:26:00', '2016-03-27 12:00:00', '2016-03-27 12:00:00', '??', '0.00', null, 'Admin', '?', '260.00', '0.00', 'CIO00000012');
INSERT INTO `tb_checkinorder` VALUES ('ff808081012a13dc01012a1aff7c0001', 'esperamier', '2', 'ɢ', '', null, '', '362422198611160012', null, '', '2005-01-01 01:06:00', '2005-01-02 12:00:00', '2005-01-02 12:00:00', '', '0.00', null, 'Admin', '', '320.00', '0.00', 'CIO00000003');

-- ----------------------------
-- Table structure for tb_demand
-- ----------------------------
DROP TABLE IF EXISTS `tb_demand`;
CREATE TABLE `tb_demand` (
  `GCID` varchar(20) NOT NULL,
  `GCDETAIL` varchar(200) DEFAULT NULL,
  `GCTIME` timestamp NULL DEFAULT NULL,
  `GCNAME` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`GCID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_demand
-- ----------------------------
INSERT INTO `tb_demand` VALUES ('1', '房间301：我想要一袋洗衣粉', '2016-03-30 21:51:25', '李大柱');
INSERT INTO `tb_demand` VALUES ('2', '房间208：我想要呼叫服务员', '2016-03-30 21:52:04', '王建国');

-- ----------------------------
-- Table structure for tb_floor
-- ----------------------------
DROP TABLE IF EXISTS `tb_floor`;
CREATE TABLE `tb_floor` (
  `FLOORID` varchar(20) NOT NULL,
  `FLROOMNUM` varchar(20) DEFAULT NULL,
  `FLPIC` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`FLOORID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_floor
-- ----------------------------
INSERT INTO `tb_floor` VALUES ('10', '10', 'public/images/rooms/single.gif');
INSERT INTO `tb_floor` VALUES ('15', '15', 'public/images/rooms/single.gif');
INSERT INTO `tb_floor` VALUES ('20', '20', 'public/images/rooms/single.gif');

-- ----------------------------
-- Table structure for tb_guest
-- ----------------------------
DROP TABLE IF EXISTS `tb_guest`;
CREATE TABLE `tb_guest` (
  `GTID` varchar(32) NOT NULL,
  `GTNAME` varchar(20) NOT NULL,
  `GTTYPE` varchar(16) NOT NULL,
  `GTCARDCATALOG` varchar(16) NOT NULL,
  `GTCARDID` varchar(32) NOT NULL,
  `GTCOUNTRY` varchar(32) DEFAULT NULL,
  `GTADDRESS` varchar(100) DEFAULT NULL,
  `GTZIP` varchar(10) DEFAULT NULL,
  `GTCOMPANY` varchar(50) DEFAULT NULL,
  `GTTELPHONE` varchar(16) DEFAULT NULL,
  `GTMOBILE` varchar(16) DEFAULT NULL,
  `GTGENDER` varchar(4) NOT NULL,
  `GTEMAIL` varchar(32) DEFAULT NULL,
  `GTCREATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`GTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_guest
-- ----------------------------
INSERT INTO `tb_guest` VALUES ('402881e6254e53a001254e63196c0006', '', '', '', '123456789123456', '', '', '', '', '', '', '', '', '2009-12-02 15:55:35');
INSERT INTO `tb_guest` VALUES ('402881e625587aa7012558e59ffa0001', '', '', '', '123456789789456', '', '', '100000', '', '456789123', '13778945612', '', 'test@qq.com', '2009-12-04 16:54:21');
INSERT INTO `tb_guest` VALUES ('402881e6256404d20125641b17560001', '', '', '', '456789123456789', '', '', '', '', '', '', '', '', '2009-12-06 21:08:34');
INSERT INTO `tb_guest` VALUES ('4028831d5383e5980153845ca42e0001', '??', '????', '???', '3552014649871341600', '??', '', '361000', '', '5885451', '13888888888', '?', '', '2016-03-17 19:36:17');
INSERT INTO `tb_guest` VALUES ('402883fa53b164570153b16d0ba90001', 'zhuyuan', '????', '???', '332564673332113', '??', '??', '', '??', '', '13566667777', '?', '', '2016-03-26 13:37:06');

-- ----------------------------
-- Table structure for tb_guesthistory
-- ----------------------------
DROP TABLE IF EXISTS `tb_guesthistory`;
CREATE TABLE `tb_guesthistory` (
  `GHID` varchar(32) NOT NULL,
  `GHBALANCEMENTID` varchar(32) NOT NULL,
  `GHREMARK` varchar(100) NOT NULL,
  `GHGUESTID` varchar(45) NOT NULL,
  `GHGUESTNAME` varchar(32) NOT NULL,
  PRIMARY KEY (`GHID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_guesthistory
-- ----------------------------
INSERT INTO `tb_guesthistory` VALUES ('402881e51a448696011a4489790a0004', '402881e51a448696011a4489783f0003', '<div align=\"center\">1.<b>remark test for edit controll</b><br></div>', '402881e51a39c232011a39da4d3e0005', 'esperamier');
INSERT INTO `tb_guesthistory` VALUES ('402881e51a53efae011a53f874e20005', '402881e51a53efae011a53f874550004', 'fdsafdsa', '402881e51a39c232011a39da4d3e0005', 'esperamier');
INSERT INTO `tb_guesthistory` VALUES ('402881e625636b70012563767f580002', '402881e625636b70012563767c6c0001', '', '402881e625587aa7012558e59ffa0001', '');

-- ----------------------------
-- Table structure for tb_operator
-- ----------------------------
DROP TABLE IF EXISTS `tb_operator`;
CREATE TABLE `tb_operator` (
  `OPUSERNAME` varchar(20) NOT NULL,
  `OPPASSWORD` varchar(32) NOT NULL,
  `OPPRIVILEGE` int(10) unsigned NOT NULL,
  `OPADDRESS` varchar(100) DEFAULT NULL,
  `OPNAME` varchar(20) NOT NULL,
  `OPTELEPHONE` varchar(16) DEFAULT NULL,
  `OPMOBILE` varchar(16) DEFAULT NULL,
  `OPZIP` varchar(10) DEFAULT NULL,
  `OPCREATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`OPUSERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_operator
-- ----------------------------
INSERT INTO `tb_operator` VALUES ('admin', 'admin', '255', null, 'NeoStudio', null, null, null, '2008-05-05 16:32:22');
INSERT INTO `tb_operator` VALUES ('FoGhost', '330022', '0', null, 'Liang', null, null, null, '2008-04-20 16:32:22');
INSERT INTO `tb_operator` VALUES ('user', '', '0', '', '', '0', '0', '0', '2010-01-29 15:52:59');

-- ----------------------------
-- Table structure for tb_reservitem
-- ----------------------------
DROP TABLE IF EXISTS `tb_reservitem`;
CREATE TABLE `tb_reservitem` (
  `RIMID` varchar(32) NOT NULL,
  `RESERVORDER_ROID` varchar(32) NOT NULL,
  `ROOM_RMID` varchar(32) NOT NULL,
  `RIMINDATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `RIMOUTDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `RIMSTATE` varchar(16) NOT NULL,
  PRIMARY KEY (`RIMID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_reservitem
-- ----------------------------
INSERT INTO `tb_reservitem` VALUES ('297e12bf1a1f79b8011a1f7fd52c0002', '297e12bf1a1f79b8011a1f7fd4bf0001', '8106', '2008-05-25 12:00:00', '2008-05-26 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e41a1396da011a13aa651a0008', '402881e41a1396da011a13aa651a0007', '8109', '2008-05-23 12:00:00', '2008-05-24 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e51a570114011a570b85d50002', '402881e51a570114011a570b85390001', '8118', '2008-06-05 12:00:00', '2008-06-06 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e51a579a4b011a57eb1ac60006', '402881e51a579a4b011a57eb1ac60005', '8308', '2008-06-05 12:00:00', '2008-06-06 12:00:00', '');
INSERT INTO `tb_reservitem` VALUES ('402881e51a5958a3011a5977e94b0003', '402881e51a5958a3011a5977e94b0002', '8109', '2008-06-06 12:00:00', '2008-06-07 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a0a09e2011a0a618c43000c', '402881e61a0a09e2011a0a618c43000b', '8308', '2008-05-21 12:00:00', '2008-05-22 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a0a09e2011a0a62c494000e', '402881e61a0a09e2011a0a62c494000d', '8106', '2008-05-21 12:00:00', '2008-05-22 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a0a09e2011a0a63647d0010', '402881e61a0a09e2011a0a63647d000f', '8109', '2008-05-21 12:00:00', '2008-05-22 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a0a09e2011a0a677c670012', '402881e61a0a09e2011a0a677c670011', '8118', '2008-05-21 12:00:00', '2008-05-22 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a0a09e2011a0a692e9b0014', '402881e61a0a09e2011a0a692e9b0013', '8208', '2008-05-21 12:00:00', '2008-05-22 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a15d2a9011a15d668270002', '402881e41a1396da011a13aa651a0007', '8109', '2008-05-23 12:00:00', '2008-05-24 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a15d2a9011a15d668a40003', '402881e41a1396da011a13aa651a0007', '8106', '2008-05-23 12:00:00', '2008-05-24 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a18cda0011a18dbaf510009', '402881e61a18cda0011a18dbaf510008', '8109', '2008-05-24 12:00:00', '2008-05-25 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e61a18cda0011a18e75919000b', '402881e61a18ca48011a18cb73bd0001', '8106', '2008-05-24 12:00:00', '2008-05-25 12:00:00', 'Ԥ');
INSERT INTO `tb_reservitem` VALUES ('402881e6254e53a001254e6c32670010', '402881e6254e53a001254e69c1440009', '8109', '2009-12-02 12:00:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_reservitem` VALUES ('402881e6254e53a001254e6c32670011', '402881e6254e53a001254e69c1440009', '8208', '2009-12-02 12:00:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_reservitem` VALUES ('402881e6254e53a001254e6c32670012', '402881e6254e53a001254e69c1440009', '8209', '2009-12-02 12:00:00', '2009-12-03 12:00:00', '');
INSERT INTO `tb_reservitem` VALUES ('402883f853c7c9560153c7d7c47a0008', '402883f853c7c9560153c7d7c4790007', '8109', '2016-03-30 12:00:00', '2016-03-31 12:00:00', '???');
INSERT INTO `tb_reservitem` VALUES ('402883f853c7c9560153c7d7f413000a', '402883f853c7c9560153c7d7f4130009', '8109', '2016-03-30 12:00:00', '2016-03-31 12:00:00', '???');
INSERT INTO `tb_reservitem` VALUES ('402883f853e415980153e42a17f10005', '402883f853e415980153e42a17ea0004', '9201', '2016-04-05 00:00:00', '2016-04-06 00:00:00', '');
INSERT INTO `tb_reservitem` VALUES ('402883f853e415980153e42a52c20007', '402883f853e415980153e42a52c10006', '9208', '2016-04-05 00:00:00', '2016-04-06 00:00:00', '');

-- ----------------------------
-- Table structure for tb_reservorder
-- ----------------------------
DROP TABLE IF EXISTS `tb_reservorder`;
CREATE TABLE `tb_reservorder` (
  `ROID` varchar(32) NOT NULL,
  `ROGROUPNAME` varchar(50) DEFAULT NULL,
  `ROGUESTNAME` varchar(20) NOT NULL,
  `ROTELPHONE` varchar(16) NOT NULL,
  `ROEMAIL` varchar(45) DEFAULT NULL,
  `ROINDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ROEARLIESTTIME` time DEFAULT NULL,
  `ROLATESTTIME` time DEFAULT NULL,
  `ROPREOUTDATETIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `RORESERVMODEL` varchar(16) NOT NULL,
  `ROPAYMENTMODEL` varchar(16) NOT NULL,
  `ROPAIDMONEY` decimal(14,2) NOT NULL,
  `ROREMARK` varchar(200) DEFAULT NULL,
  `ROPREASSIGNROOM` varchar(32) DEFAULT NULL,
  `RORESERVSTATE` varchar(16) NOT NULL,
  `ROOPERATOR` varchar(32) NOT NULL,
  `ROCREATETIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ROFAX` varchar(16) DEFAULT NULL,
  `ROGUESTGENDER` varchar(6) NOT NULL,
  `ROGUESTCARDCATALOG` varchar(16) DEFAULT NULL,
  `ROGUESTCARDID` varchar(32) DEFAULT NULL,
  `ROTOTALRATE` decimal(14,2) NOT NULL,
  `ROORDERID` varchar(32) NOT NULL,
  PRIMARY KEY (`ROID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_reservorder
-- ----------------------------
INSERT INTO `tb_reservorder` VALUES ('297e12bf1a1f79b8011a1f7fd4bf0001', '', 'dfa', 'sfdsfd', '', '2008-05-25 12:00:00', '12:00:00', '12:00:00', '2008-05-26 12:00:00', '', '', '0.00', '', '', 'Ԥ', 'admin', '2008-05-25 17:54:08', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e41a1396da011a13aa651a0007', null, 'fsfds', 'fsdfds', '', '2008-05-23 12:00:00', '12:00:00', '12:00:00', '2008-05-24 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-23 10:45:11', '', '', '', '412728168690466030', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e51a570114011a570b85390001', '', 'esperamier', '123456789231', 'dddddd@domain.com', '2008-06-05 12:00:00', '01:15:00', '01:15:00', '2008-06-06 12:00:00', '', '', '200.00', '', '', 'Ԥ', 'admin', '2008-06-05 12:45:50', '', '', '', '362422198611160012', '300.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e51a579a4b011a57eb1ac60005', '', 'esperamier', 'esperamier', 'kof@yahoo.com.cn', '2008-06-05 12:00:00', '01:00:00', '01:00:00', '2008-06-06 12:00:00', '', '֧', '0.00', '', '', '', 'admin', '2008-06-05 16:50:02', '432432432432', '', '', '362422198611160012', '1000.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e51a5958a3011a5977e94b0002', '', 'ref', 'dffd', '', '2008-06-06 12:00:00', '12:00:00', '12:00:00', '2008-06-07 12:00:00', '', '', '0.00', '', '', 'Ԥ', 'Admin', '2008-06-06 00:03:27', '', '', '', '', '0.00', 'RO00000002');
INSERT INTO `tb_reservorder` VALUES ('402881e61a0a09e2011a0a618c43000b', null, 'DFS', 'FDS', '', '2008-05-21 12:00:00', '12:00:00', '12:00:00', '2008-05-22 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-21 15:29:02', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a0a09e2011a0a62c494000d', null, 'dfs', 'fds', '', '2008-05-21 12:00:00', '12:00:00', '12:00:00', '2008-05-22 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-21 15:30:22', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a0a09e2011a0a63647d000f', null, 'fd', 'fd', '', '2008-05-21 12:00:00', '12:00:00', '12:00:00', '2008-05-22 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-21 15:31:03', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a0a09e2011a0a677c670011', null, 'dfs', 'fdsf', '', '2008-05-21 12:00:00', '12:00:00', '12:00:00', '2008-05-22 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-21 15:35:31', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a0a09e2011a0a692e9b0013', null, 'dsadad', 'sds', '', '2008-05-21 12:00:00', '12:00:00', '12:00:00', '2008-05-22 12:00:00', '', '', '0.00', '', null, 'Ԥ', 'admin', '2008-05-21 15:37:22', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a18ca48011a18cb73bd0001', '', 'fsf', 'fsfd', '', '2008-05-24 12:00:00', '12:00:00', '12:00:00', '2008-05-25 12:00:00', '', '', '0.00', '', '', 'Ԥ', 'admin', '2008-05-24 10:39:24', 'sdfsafd@', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e61a18cda0011a18dbaf510008', '', 'fsf', 'fdsfsf', '', '2008-05-24 12:00:00', '12:00:00', '12:00:00', '2008-05-25 12:00:00', '', '', '0.00', '', '', 'Ԥ', 'admin', '2008-05-24 10:57:07', '', '', '', '', '0.00', '');
INSERT INTO `tb_reservorder` VALUES ('402881e6254e53a001254e69c1440009', '', 'ddddddd', '020-26568911-15', 'dddd@yahoo.com.cn', '2009-12-02 12:00:00', '01:00:00', '08:30:00', '2009-12-03 12:00:00', '', '', '0.00', '', '', '', 'Admin', '2009-12-02 16:02:51', '', '', '', '123456789123456', '0.00', 'RO00000001');
INSERT INTO `tb_reservorder` VALUES ('402883f853c7c9560153c7d7c4790007', '', 'www', '18030023460', '', '2016-03-30 12:00:00', '12:00:00', '12:00:00', '2016-03-31 12:00:00', '????', '??', '100.00', '', '', '???', 'Admin', '2016-03-30 22:00:49', '', '?', '???', '350111121212121212', '0.00', 'RO00000007');
INSERT INTO `tb_reservorder` VALUES ('402883f853c7c9560153c7d7f4130009', '', 'www', '18030023460', '', '2016-03-30 12:00:00', '12:00:00', '12:00:00', '2016-03-31 12:00:00', '????', '??', '100.00', '', '', '???', 'Admin', '2016-03-30 22:05:31', '', '?', '???', '350111121212121212', '0.00', 'RO00000008');
INSERT INTO `tb_reservorder` VALUES ('402883f853e415980153e42a17ea0004', '', 'wu', '13646029214', '', '2016-04-05 00:00:00', '00:00:00', '00:00:00', '2016-04-06 00:00:00', '????', '', '0.00', '', '', '', 'Admin', '2016-04-05 10:04:25', '', '?', '???', '350821199208195131', '0.00', 'RO00000012');
INSERT INTO `tb_reservorder` VALUES ('402883f853e415980153e42a52c10006', '', 'wjl', '13890644811', '', '2016-04-05 00:00:00', '00:00:00', '00:00:00', '2016-04-06 00:00:00', '????', '', '0.00', '', '', '', 'Admin', '2016-04-05 10:04:25', '', '?', '???', '350204111111111111', '0.00', 'RO00000013');

-- ----------------------------
-- Table structure for tb_room
-- ----------------------------
DROP TABLE IF EXISTS `tb_room`;
CREATE TABLE `tb_room` (
  `RMID` varchar(12) NOT NULL,
  `RMAREA` varchar(10) DEFAULT NULL,
  `RMFLOOR` varchar(10) NOT NULL,
  `RMPRCTPRICE` decimal(14,2) NOT NULL,
  `RMTELPHONE` varchar(24) DEFAULT NULL,
  `RMSTATE` tinyint(3) unsigned NOT NULL,
  `RMAVAILABLE` tinyint(1) NOT NULL,
  `RMCATALOG` varchar(32) NOT NULL,
  `RMPICTURE` varchar(100) NOT NULL,
  `RMPRCTDISCOUNT` decimal(14,2) NOT NULL DEFAULT '100.00',
  PRIMARY KEY (`RMID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_room
-- ----------------------------
INSERT INTO `tb_room` VALUES ('10000', '8', '15', '260.00', '101', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('8101', '8', '15', '260.00', '101', '2', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('8102', '8', '15', '2880.00', '100', '0', '1', '002', 'public/images/rooms/standardroom.gif', '1000.00');
INSERT INTO `tb_room` VALUES ('8103', '8', '15', '360.00', '103', '0', '1', '003', 'public/images/rooms/standardroom.gif', '280.00');
INSERT INTO `tb_room` VALUES ('8104', '8', '15', '1188.00', '104', '0', '1', '004', 'public/images/rooms/standardroom.gif', '788.00');
INSERT INTO `tb_room` VALUES ('8106', '8', '15', '260.00', '123', '0', '1', '005', 'public/images/rooms/single.gif', '190.00');
INSERT INTO `tb_room` VALUES ('8109', '8', '15', '1880.00', '126', '0', '1', '002', 'public/images/rooms/standardroom.gif', '1000.00');
INSERT INTO `tb_room` VALUES ('8118', '8', '15', '260.00', '127', '0', '1', '001', 'public/images/rooms/single.gif', '100.00');
INSERT INTO `tb_room` VALUES ('8208', '8', '20', '260.00', '128', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('8209', '8', '20', '260.00', '129', '0', '1', '001', 'public/images/rooms/single.gif', '100.00');
INSERT INTO `tb_room` VALUES ('8308', '8', '20', '260.00', '130', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9101', '9', '10', '260.00', '9101', '0', '1', '001', 'public/images/rooms/single.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9201', '8', '10', '260.00', '0', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9202', '8', '10', '260.00', '100', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9203', '8', '10', '260.00', '440', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9204', '8', '10', '260.00', '100', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9206', '0', '20', '260.00', '0', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9207', '0', '15', '260.00', '0', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9208', '0', '20', '260.00', '0', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');
INSERT INTO `tb_room` VALUES ('9999', '8', '20', '260.00', '0', '0', '1', '001', 'public/images/rooms/standardroom.gif', '100.00');

-- ----------------------------
-- Table structure for tb_roomcatalog
-- ----------------------------
DROP TABLE IF EXISTS `tb_roomcatalog`;
CREATE TABLE `tb_roomcatalog` (
  `RCID` varchar(32) NOT NULL,
  `RCNAME` varchar(18) NOT NULL,
  `RCBEDNUMBER` varchar(32) NOT NULL,
  `RCPREPRICE` decimal(14,2) NOT NULL,
  `RCPREDISCOUNT` decimal(14,2) DEFAULT '100.00',
  `RCHOURBASEPRICE` decimal(14,2) DEFAULT NULL,
  `RCPERHOURPRICE` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`RCID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_roomcatalog
-- ----------------------------
INSERT INTO `tb_roomcatalog` VALUES ('402881e51a5472f8011a547548440001', '001', '标准单人房', '200.00', '180.00', '50.00', '50.00');
INSERT INTO `tb_roomcatalog` VALUES ('402881e5267907ec0126790f5ec40003', '002', '商务大床房', '2880.00', '1000.00', '3000.00', '300.00');
INSERT INTO `tb_roomcatalog` VALUES ('402881e6255344820125538694350001', '003', '大床房', '360.00', '280.00', '200.00', '100.00');
INSERT INTO `tb_roomcatalog` VALUES ('402881e625576bea0125578a63ba0002', '004', '商务双人房', '1188.00', '788.00', '2000.00', '200.00');
INSERT INTO `tb_roomcatalog` VALUES ('RC889', '005', '标准双人房', '260.00', '190.00', '150.00', '40.00');
