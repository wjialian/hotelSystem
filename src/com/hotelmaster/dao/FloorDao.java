package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.Floor;

public interface FloorDao extends GenericDao<Floor>{
	public List<Floor> showAllFloor();
	public boolean addNewFloor(Floor floor);
	public boolean delFloor(Floor floor);
}
