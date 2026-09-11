package com.bankease.repository;

import com.bankease.entity.BillPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillPaymentRepository extends JpaRepository<BillPayment, Long> {
    List<BillPayment> findByBillId(Long billId);
    List<BillPayment> findByAccountId(Long accountId);
}
