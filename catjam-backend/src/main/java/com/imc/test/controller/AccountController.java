package com.imc.test.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imc.test.model.Account;
import com.imc.test.service.AccountService;

@RestController
@RequestMapping("/api/account")
public class AccountController {
	
	@Autowired
	private AccountService accService;
	
	@PostMapping("/add")
	public String addAccount(@RequestBody Account account) {
		if (accService.saveAccount(account)) {
			return "account ID exists";
		}
		else
			return account.getAccountId() + " account added";
	}
	
	@PostMapping("/add/{userId}")
	public String addAccount(@RequestBody Account account, @PathVariable Long userId) {
		if (accService.saveAccountByUser(account, userId)) {
			return "account ID exists";
		}
		else
			return account.getAccountId() + " account added";
	}
	
	@GetMapping("/{id}")
	public Account getAccountById(@PathVariable Long id) {
		return accService.getAccountById(id);
	}
	
	@GetMapping("/getAllAccounts")
	public List<Account> getAllAccounts(){
		List<Account> accList = accService.getAllAccounts();
		for (Account acc : accList)
		{
			Map<String, Object> map = accService.toMap(acc);
			//System.out.println(Arrays.asList(map));
		}
		return accList;
	}
	
	@DeleteMapping("/{id}")
	public String deleteAccountById(@PathVariable Long id) {
		accService.deleteAccountById(id);
		return "ID of " + id + " is deleted";
	}
}
