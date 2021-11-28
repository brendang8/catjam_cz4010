package com.imc.test.repo;

import com.imc.test.model.Account;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface AccountRepo extends Neo4jRepository<Account, Long> {

}
