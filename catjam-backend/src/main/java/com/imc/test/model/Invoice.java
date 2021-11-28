package com.imc.test.model;

import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity
public class Invoice {
	@Id
	private Long invoiceId;
	
	private String assignedTo;
	private String postedBy;
	private Boolean fileUploaded;
	private Boolean paid;
	
	public Invoice(Long invoiceId, String assignedTo, String postedBy) {
		super();
		this.invoiceId = invoiceId;
		this.assignedTo = assignedTo;
		this.postedBy = postedBy;
	}
	
	public Invoice(Long invoiceId, String assignedTo, String postedBy, Boolean fileUploaded, Boolean paid) {
		super();
		this.invoiceId = invoiceId;
		this.assignedTo = assignedTo;
		this.postedBy = postedBy;
		this.fileUploaded = fileUploaded;
		this.paid = paid;
	}
	public Long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
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
	public Boolean getFileUploaded() {
		return fileUploaded;
	}
	public void setFileUploaded(Boolean fileUploaded) {
		this.fileUploaded = fileUploaded;
	}
	public Boolean getPaid() {
		return paid;
	}
	public void setPaid(Boolean paid) {
		this.paid = paid;
	}
	
	
}
