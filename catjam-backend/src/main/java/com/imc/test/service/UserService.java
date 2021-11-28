package com.imc.test.service;

import java.util.List;
import java.util.Map;

import com.imc.test.model.User;

public interface UserService {
	
	public boolean saveUser(User user);

	public User getUserById(Long id);

	public List<User> getAllUsers();

	public void deleteUserById(Long id);
	
	public Map<String, Object> toMap(User user);

	public User getUserByUsername(String username);

}
