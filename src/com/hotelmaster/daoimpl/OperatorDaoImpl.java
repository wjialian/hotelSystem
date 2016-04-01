package com.hotelmaster.daoimpl;

import java.util.List;

import com.hotelmaster.dao.OperatorDao;
import com.hotelmaster.po.Guest;
import com.hotelmaster.po.Operator;
import com.hotelmaster.po.Room;

public class OperatorDaoImpl extends GenericHibernateDao<Operator> implements OperatorDao{

	public OperatorDaoImpl() {
		super(Operator.class);
		// TODO Auto-generated constructor stub
	}

	public List<Operator> showAllOperators() {
		List<Operator> operatorList = hibernateTemplate.find("from Operator");
		return operatorList;
	}

	public boolean addNewOperator(Operator operator) {
		// TODO Auto-generated method stub
		String name = operator.getOpUserName();
		Long count=(Long)queryForObject(
				"select count(*) from Operator where opUserName=?"
				,new Object[] {name});
		if(count.longValue()==0){
			hibernateTemplate.save(operator);
			return true;
		}
		else{
			log.info("The data was exist in database");
			return false;
		}
	}

	public boolean deleteOperator(Operator operator) {
		Operator delOperator = new Operator();
		delOperator = operator;
		Long count=(Long)queryForObject(
				"select count(*) from Operator where opUserName=?"
				,new Object[] {operator.getOpUserName()});
		if(count.longValue()==0){
			return false;
		}
		else{
			hibernateTemplate.delete(delOperator);
			return true;
		}	
	}

	public Operator findOperatorByOpUserName(String opUserName) {
		List operator= hibernateTemplate.find("from Operator where opUserName='"+opUserName+"'");
		if(operator.size()!=0){
			return (Operator)operator.get(0);
		}else{
			return null;
		}
	}
	
	
}
