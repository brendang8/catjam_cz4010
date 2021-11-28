package com.imc.test.repo;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.imc.test.model.User;

public interface UserRepo extends Neo4jRepository<User, Long>{
	User findByUsername(String username);
	
}