package com.bankease.service;

import com.bankease.dto.BeneficiaryDTO;
import com.bankease.dto.CreateBeneficiaryRequest;
import com.bankease.entity.Beneficiary;
import com.bankease.entity.User;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.BeneficiaryRepository;
import com.bankease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeneficiaryService {
    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private UserRepository userRepository;

    public BeneficiaryDTO createBeneficiary(Long userId, CreateBeneficiaryRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Beneficiary beneficiary = Beneficiary.builder()
                .user(user)
                .name(request.getName())
                .accountNumber(request.getAccountNumber())
                .bankName(request.getBankName())
                .ifsc(request.getIfsc())
                .status(Beneficiary.BeneficiaryStatus.ACTIVE)
                .build();

        Beneficiary saved = beneficiaryRepository.save(beneficiary);
        return convertToDTO(saved);
    }

    public List<BeneficiaryDTO> getBeneficiariesByUserId(Long userId) {
        List<Beneficiary> beneficiaries = beneficiaryRepository.findByUserIdAndStatus(
                userId, Beneficiary.BeneficiaryStatus.ACTIVE);
        return beneficiaries.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Beneficiary getBeneficiaryById(Long beneficiaryId) {
        return beneficiaryRepository.findById(beneficiaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));
    }

    public void deleteBeneficiary(Long beneficiaryId, Long userId) {
        Beneficiary beneficiary = getBeneficiaryById(beneficiaryId);
        if (!beneficiary.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        beneficiary.setStatus(Beneficiary.BeneficiaryStatus.INACTIVE);
        beneficiaryRepository.save(beneficiary);
    }

    private BeneficiaryDTO convertToDTO(Beneficiary beneficiary) {
        return BeneficiaryDTO.builder()
                .id(beneficiary.getId())
                .name(beneficiary.getName())
                .accountNumber(beneficiary.getAccountNumber())
                .bankName(beneficiary.getBankName())
                .ifsc(beneficiary.getIfsc())
                .status(beneficiary.getStatus().toString())
                .build();
    }
}
