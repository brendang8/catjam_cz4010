package com.imc.test.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imc.test.model.User;
import com.imc.test.repo.UserRepo;
import com.imc.test.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public boolean saveUser(User user) {
		if (userRepo.existsById(user.getUserId())) {
			return true;
		}
		else {
			userRepo.save(user);
			return false;
		}	
	}

	@Override
	public User getUserById(Long id) {
		Optional<User> optionalUser = userRepo.findById(id);
		User user = optionalUser.get();
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		return (List<User>)userRepo.findAll();
	}

	@Override
	public void deleteUserById(Long id) {
		userRepo.deleteById(id);
	}

	@Override
	public Map<String, Object> toMap(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

}
