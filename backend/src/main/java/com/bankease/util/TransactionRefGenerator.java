package com.bankease.util;

import java.util.UUID;

public class TransactionRefGenerator {
    public static String generate() {
        return "TXN" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
    }
}
