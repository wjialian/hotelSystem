package com.hotelmaster.dao;

import java.util.List;

import com.hotelmaster.po.Operator;

public interface OperatorDao extends GenericDao<Operator>{
	public List<Operator> showAllOperators();
	public boolean addNewOperator(Operator operator);
	public boolean deleteOperator(Operator operator);
	public Operator findOperatorByOpUserName(String opUserName);
}
