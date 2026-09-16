package com.bankease.repository;

import com.bankease.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderAccountId(Long accountId);
    List<Transaction> findByReceiverAccountId(Long accountId);
    List<Transaction> findBySenderAccountIdIn(List<Long> accountIds);
    List<Transaction> findByReceiverAccountIdIn(List<Long> accountIds);
}
