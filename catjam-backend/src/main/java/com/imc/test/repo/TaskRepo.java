package com.imc.test.repo;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.imc.test.model.Task;

public interface TaskRepo extends Neo4jRepository<Task, Long>{

}
