package com.bankease.repository;

import com.bankease.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByTransactionReference(String reference);
    Page<Transaction> findBySenderAccountId(Long accountId, Pageable pageable);
    Page<Transaction> findByReceiverAccountId(Long accountId, Pageable pageable);
}
