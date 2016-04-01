package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.RoomCatalog;

public interface RoomCatalogDao extends GenericDao<RoomCatalog>{
	public List<RoomCatalog> showAllRoomCatalog();
	public boolean addNewRoomCatalog(RoomCatalog roomCatalog);
	public boolean delRoomCatalog(RoomCatalog roomCatalog);
}
