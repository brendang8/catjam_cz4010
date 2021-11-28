package com.imc.test;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {
	
	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome to test";
	}
	@GetMapping("")
	public String index() {
		return "Default Page";
	}
	
	@GetMapping("/private")
	public String privatePage() {
		return "Private Page";
	}
}
