package com.imc.test.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imc.test.model.User;
import com.imc.test.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public String addUser(@RequestBody User user) {
		if (userService.saveUser(user)) {
			return "User ID exists";
		}
		else
			return user.getUserId() + " User added";
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {
		return userService.getUserById(id);
	}
	
	@GetMapping("/username/{username}")
	public User getUserByUsername(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}
	
	@GetMapping("/getAllUsers")
	public List<User> getAllUsers(){
		List<User> userList = userService.getAllUsers();
		for (User user : userList)
		{
			Map<String, Object> map = userService.toMap(user);
			//System.out.println(Arrays.asList(map));
		}
		return userList;
	}
	
	@DeleteMapping("/{id}")
	public String deleteUserById(@PathVariable Long id) {
		userService.deleteUserById(id);
		return "ID of " + id + " is deleted";
	}

}
