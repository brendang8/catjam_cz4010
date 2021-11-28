package com.imc.test.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imc.test.model.Account;
import com.imc.test.repo.AccountRepo;
import com.imc.test.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	private AccountRepo accRepo;
	
	public boolean saveAccount(Account account) {
		if (accRepo.existsById(account.getAccountId())) {
			return true;
		}
		else {
			accRepo.save(account);
			return false;
		}	
	}

	@Override
	public boolean saveAccountByUser(Account account, Long userId) {
		// TODO Auto-generated method stub
		return false;
	}
	
	public Account getAccountById(Long id) {
		Optional<Account> optionalAcc = accRepo.findById(id);
		Account acc = optionalAcc.get();
		return acc;
	}

	public List<Account> getAllAccounts() {
		return (List<Account>)accRepo.findAll();
	}

	public Map<String, Object> toMap(Account acc)
	{
		HashMap<String, Object> map = new HashMap<>();
		map.put("id", acc.getAccountId());
		map.put("name", acc.getName());
		return map;
	}	
	
	public void deleteAccountById(Long id) {
		accRepo.deleteById(id);
	}
}
