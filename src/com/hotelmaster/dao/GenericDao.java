package com.hotelmaster.dao;

import java.io.Serializable;

/**
 * Class description goes here.
 * 
 * @
 * @Date Apr 14, 2008
 */
public interface GenericDao<T> {
	
	/**
    * Query object by specified id.
    */
	T query(Serializable id);
	
	/**
    * Create an domain object.
    */
	void create(T t);
	
	/**
    * Delete an object.
    */
	void delete(T t);
	
	/**
	* Update an object.
	*/
	void update(T t);
}
