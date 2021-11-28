package com.imc.test.repo;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import com.imc.test.model.Task;

public interface TaskRepo extends Neo4jRepository<Task, Long>{

	@Query("MATCH (t:Task) WHERE t.postedBy={username} RETURN t")
	List<Task> findAssignedTasks(@Param("username") String username);
	
	@Query("MATCH (t:Task) WHERE t.taskId=$id "
			+ "SET t.assignedTo = $username "
			+ "RETURN t")
	Task updateAssignedTo(@Param("id") Long id, @Param("username") String username);
	
	@Query("MATCH (t:Task) WHERE t.taskId=$id "
			+ "SET t.status = $status "
			+ "RETURN t")
	Task updateStatus(@Param("id") Long id, @Param("status") String status);
}
