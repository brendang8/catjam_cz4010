package com.imc.test.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imc.test.model.Account;
import com.imc.test.repo.AccountRepo;

public interface AccountService {
	
	public boolean saveAccount(Account account);

	public Account getAccountById(Long id);

	public List<Account> getAllAccounts();

	public void deleteAccountById(Long id);
	
	public Map<String, Object> toMap(Account acc);

	public boolean saveAccountByUser(Account account, Long userId);
	
}
