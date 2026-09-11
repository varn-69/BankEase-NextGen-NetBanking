package com.bankease.repository;

import com.bankease.entity.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    List<Beneficiary> findByUserIdAndStatus(Long userId, Beneficiary.BeneficiaryStatus status);
    List<Beneficiary> findByUserId(Long userId);
}
