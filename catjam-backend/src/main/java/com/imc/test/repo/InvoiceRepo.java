package com.imc.test.repo;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.imc.test.model.Invoice;

public interface InvoiceRepo extends Neo4jRepository<Invoice, Long> {

}