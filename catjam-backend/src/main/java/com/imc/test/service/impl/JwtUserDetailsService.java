package com.imc.test.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.imc.test.model.User;
import com.imc.test.repo.UserRepo;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepo userRepo;
	
	public JwtUserDetailsService(UserRepo userRepo) {
		this.userRepo = userRepo;
	}
	
	private BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userRepo.findByUsername(username);
//		System.out.println("from DB User: " + user.getUsername());
//		JwtUserDetails userDetails = new JwtUserDetails(user);
//		System.out.println("User details from jwtuserdetailsService \nusername: " + userDetails.getUsername() 
//		+ " password: " + userDetails.getPassword());
//		return userDetails;
		//return new User("test","123", new ArrayList<>());
		final String pw =  bcrypt.encode(user.getPassword());
		return new org.springframework.security.core.userdetails.User(user.getUsername(),pw, new ArrayList<>());
	}

}
