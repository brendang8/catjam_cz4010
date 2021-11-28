package com.imc.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imc.test.model.Invoice;
import com.imc.test.model.Task;
import com.imc.test.service.AccountService;
import com.imc.test.service.InvoiceService;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {


	@Autowired
	private InvoiceService invoiceService;
	
	@PostMapping("/add")
	public String addInvoice(@RequestBody Invoice invoice) {
		if (invoiceService.saveInvoice(invoice)) {
			return "Invoice ID exists";
		}
		else
			return invoice.getInvoiceId() + " Invoice added";
	}
}
