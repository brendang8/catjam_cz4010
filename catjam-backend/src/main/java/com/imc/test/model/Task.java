package com.imc.test.model;

import java.util.Date;
import java.util.List;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Task {
	@Id
	private Long taskId;
	private String title;
	private String description;
	private int deliveryDays;
	private double price;
	private String assignedTo;
	private String postedBy;
	
	public Task(Long taskId, String title, String description, int deliveryDays, double price, String postedBy) {
		super();
		this.taskId = taskId;
		this.title = title;
		this.description = description;
		this.deliveryDays = deliveryDays;
		this.price = price;
		this.postedBy = postedBy;
	}
	public Long getTaskId() {
		return taskId;
	}
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getDeliveryDays() {
		return deliveryDays;
	}
	public void setDeliveryDays(int deliveryDays) {
		this.deliveryDays = deliveryDays;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getPostedBy() {
		return postedBy;
	}
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}
}
