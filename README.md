# BankEase - NextGen Net Banking Application

## Overview
BankEase is a modern, secure net banking application built with Spring Boot and Angular, providing comprehensive financial services including account management, fund transfers, bill payments, loans, and investments.

## Features

### Core Banking Features
- **User Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Account Management**: Create and manage multiple bank accounts (Savings, Current, etc.)
- **Fund Transfers**: Secure inter-account and inter-bank transfers with transaction tracking
- **Beneficiary Management**: Add and manage trusted beneficiaries for quick transfers
- **Bill Payments**: Pay utility and credit card bills directly from the app
- **Transaction History**: Complete transaction audit trail

### Financial Services
- **Loan Management**: Apply for various types of loans (Personal, Education, Home, Vehicle)
- **EMI Calculation**: Automatic EMI calculation based on loan parameters
- **Investment Portal**: Invest in mutual funds, fixed deposits, and other investment products
- **Portfolio Management**: Track investment performance and returns

### Security Features
- JWT Token-based authentication
- Role-based access control (Admin, Staff, Customer)
- Transaction PIN validation
- Account locking after failed login attempts
- Comprehensive audit logging
- CORS configuration for frontend integration

### Dashboard
- Account balance overview
- Pending bills summary
- Active loans status
- Investment portfolio value
- Last login information

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Java**: JDK 17
- **Database**: MySQL 8.0
- **Security**: Spring Security + JWT
- **API Documentation**: OpenAPI 3.0 (Swagger)
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven

### Database
- MySQL 8.0 with Hibernate Auto-DDL

## Project Structure

```
backend/
├── src/main/java/com/bankease/
│   ├── BankeaseApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── OpenAPIConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── AccountController.java
│   │   ├── TransferController.java
│   │   ├── BeneficiaryController.java
│   │   ├── BillPaymentController.java
│   │   ├── LoanController.java
│   │   ├── InvestmentController.java
│   │   ├── DashboardController.java
│   │   └── UserController.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Account.java
│   │   ├── Transaction.java
│   │   ├── Beneficiary.java
│   │   ├── Bill.java
│   │   ├── BillPayment.java
│   │   ├── Loan.java
│   │   ├── Investment.java
│   │   └── AuditLog.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── AccountService.java
│   │   ├── TransferService.java
│   │   ├── BeneficiaryService.java
│   │   ├── BillPaymentService.java
│   │   ├── LoanService.java
│   │   ├── InvestmentService.java
│   │   ├── DashboardService.java
│   │   ├── UserService.java
│   │   └── AuditLogService.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── AccountRepository.java
│   │   ├── TransactionRepository.java
│   │   ├── BeneficiaryRepository.java
│   │   ├── BillRepository.java
│   │   ├── BillPaymentRepository.java
│   │   ├── LoanRepository.java
│   │   ├── InvestmentRepository.java
│   │   └── AuditLogRepository.java
│   ├── dto/
│   │   ├── AuthResponse.java
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── AccountDTO.java
│   │   ├── TransferRequest.java
│   │   ├── TransactionDTO.java
│   │   ├── BeneficiaryDTO.java
│   │   ├── CreateBeneficiaryRequest.java
│   │   ├── BillPaymentRequest.java
│   │   ├── LoanApplicationRequest.java
│   │   ├── LoanDTO.java
│   │   ├── InvestmentRequest.java
│   │   ├── InvestmentDTO.java
│   │   └── DashboardDTO.java
│   ├── exception/
│   │   ├── ApiError.java
│   │   ├── ResourceNotFoundException.java
│   │   ├── InsufficientBalanceException.java
│   │   ├── InvalidTransactionException.java
│   │   ├── DuplicateResourceException.java
│   │   └── GlobalExceptionHandler.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── CustomUserDetailsService.java
│   └── util/
│       ├── TransactionRefGenerator.java
│       ├── AccountNumberGenerator.java
│       └── IpAddressUtil.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Accounts
- `POST /api/accounts/create` - Create new account
- `GET /api/accounts` - Get all user accounts
- `GET /api/accounts/{accountId}` - Get account details

### Transfers
- `POST /api/transfers` - Initiate fund transfer

### Beneficiaries
- `POST /api/beneficiaries` - Add beneficiary
- `GET /api/beneficiaries` - Get all beneficiaries
- `DELETE /api/beneficiaries/{beneficiaryId}` - Delete beneficiary

### Bills
- `GET /api/bills` - Get all bills
- `GET /api/bills/{billId}` - Get bill details
- `POST /api/bills/pay` - Pay bill

### Loans
- `POST /api/loans/apply` - Apply for loan
- `GET /api/loans` - Get all loans
- `GET /api/loans/{loanId}` - Get loan details
- `POST /api/loans/{loanId}/approve` - Approve loan (Admin)
- `POST /api/loans/{loanId}/reject` - Reject loan (Admin)

### Investments
- `POST /api/investments` - Purchase investment
- `GET /api/investments` - Get all investments
- `GET /api/investments/portfolio/value` - Get portfolio value

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Users (Admin)
- `GET /api/users/{userId}` - Get user details
- `GET /api/users` - Get all users (Admin)
- `POST /api/users/{userId}/deactivate` - Deactivate user (Admin)
- `POST /api/users/{userId}/activate` - Activate user (Admin)

## Setup Instructions

### Prerequisites
- JDK 17 or higher
- MySQL 8.0
- Maven 3.6+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/varn-69/BankEase-NextGen-NetBanking.git
   cd BankEase-NextGen-NetBanking
   ```

2. **Configure Database**
   - Create a MySQL database: `bankease`
   - Update `application.properties` with your database credentials
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bankease
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```

3. **Build the Backend**
   ```bash
   cd backend
   mvn clean install
   ```

4. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```
   The application will start on `http://localhost:8080/api`

5. **Access API Documentation**
   - Swagger UI: `http://localhost:8080/api/swagger-ui.html`
   - OpenAPI JSON: `http://localhost:8080/api/v3/api-docs`

## Security Considerations

- All sensitive endpoints require JWT authentication
- Passwords are encrypted using BCrypt
- Transaction PIN validation for sensitive operations
- Failed login attempts trigger account lock (5 attempts × 1 hour)
- All operations are audit logged
- CORS is configured for specific origins only
- SQL injection and XSS protection through Spring Security

## Default Credentials

For testing purposes, create a user through the registration endpoint.

Test Transaction PIN: `1234`

## Validation Rules

- **Username**: 3-50 characters
- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Transfer Amount**: Must be positive and within daily limit (₹100,000)
- **Loan Tenure**: Minimum 6 months
- **Account Balance**: Cannot go negative

## Error Handling

All API responses follow a consistent error format:

```json
{
  "timestamp": "2024-01-15T10:30:45",
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Field validation failed",
  "path": "/api/endpoint"
}
```

## Logging

- Log Level: INFO (Application logs: DEBUG)
- Log File: `logs/bankease.log`
- Console Output: Formatted with timestamp and message

## Future Enhancements

- Mobile App Integration
- Advanced Analytics Dashboard
- Recurring Payment Automation
- Credit Score Analysis
- Wealth Management Services
- Insurance Integration
- Cryptocurrency Integration
- AI-Powered Fraud Detection

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For support or queries:
- Email: support@bankease.com
- GitHub Issues: [Create an issue](https://github.com/varn-69/BankEase-NextGen-NetBanking/issues)

## Acknowledgments

- Spring Boot Team
- JWT.io
- OpenAPI Initiative
- MySQL Community
