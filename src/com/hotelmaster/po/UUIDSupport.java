package com.hotelmaster.po;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
/**
 * Class description goes here.
 * 
 * @
 * @Date Apr 17, 2008
 */
public abstract class UUIDSupport {
	
	 protected String id;
	 
	 @Id
	 @Column(nullable=false, updatable=false, length=32)
	 @GeneratedValue(generator="system-uuid")
	 @GenericGenerator(name="system-uuid", strategy="uuid")
	 public String getId() { return id; }
	 public void setId(String id) { this.id = id; }
}
