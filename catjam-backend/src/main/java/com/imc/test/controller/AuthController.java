package com.imc.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.imc.test.jwt.JwtAuthRequest;
import com.imc.test.jwt.JwtAuthResponse;
import com.imc.test.jwt.JwtUtil;
import com.imc.test.service.impl.JwtUserDetailsService;

@Controller
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired JwtUtil jwtUtil;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthRequest authenticationRequest)
			throws Exception {
		try {
			System.out.println("authenticating...");
			System.out.println(authenticationRequest.getUsername() + authenticationRequest.getPassword());
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
			System.out.println("authenticated");
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect Username or password", e);
		}
		final UserDetails userdetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtUtil.generateToken(userdetails);
		
		return ResponseEntity.ok(new JwtAuthResponse(jwt));
	}

}
