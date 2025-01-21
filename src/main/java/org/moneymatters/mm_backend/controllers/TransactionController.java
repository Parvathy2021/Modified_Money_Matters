package org.moneymatters.mm_backend.controllers;

import jakarta.validation.Valid;
import org.moneymatters.mm_backend.data.BudgetRepository;
import org.moneymatters.mm_backend.data.TagRepository;
import org.moneymatters.mm_backend.data.TransactionRepository;
import org.moneymatters.mm_backend.data.UserRepository;
import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.Tag;
import org.moneymatters.mm_backend.models.Transaction;
import org.moneymatters.mm_backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TagRepository tagRepository;

//    Create transaction
@PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody @Valid Transaction transaction,
                                               @RequestParam Integer user_id,
                                               @RequestParam(required = false) Integer budget_id,
                                               @RequestParam(required = false) Integer tag_id) {
    Optional<User> userOptional = userRepository.findById(user_id);
    if (userOptional.isEmpty()) {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
    transaction.setUser(userOptional.get());

    if  (budget_id != null) {
    Optional<Budget> budgetOptional = budgetRepository.findById(budget_id);
    if (budgetOptional.isEmpty()) {
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }
    transaction.setBudgetId(budgetOptional.get());
    }
    if (tag_id != null) {
        Optional<Tag> tagOptional = tagRepository.findById(tag_id);
        if (tagOptional.isEmpty()) {
            return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND);
        }
        transaction.setTag(tagOptional.get());
    }
    Transaction savedTransaction = transactionRepository.save(transaction);
    return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
}

//      Get all transactions for a user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getUserTransactions(@PathVariable Integer user_id) {
    Optional<User> userOptional = userRepository.findById(user_id);
    if (userOptional.isEmpty()) {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
        List<Transaction> transactions = transactionRepository.findByUser(userOptional.get());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

//    Get transactions by budget
    @GetMapping("/budget/{budget_id}")
    public ResponseEntity<?> getBudgetTransactions(@PathVariable Integer budget_id) {
    Optional<Budget> budgetOptional = budgetRepository.findById(budget_id);
    if (budgetOptional.isEmpty()) {
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }
    List<Transaction> transactions = transactionRepository.findByBudget(budgetOptional.get());
    return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

//    Get transactions by tag
    @GetMapping("/tag/{tag_id}")
    public ResponseEntity<?> getTagTransactions(@PathVariable Integer tag_id) {
    Optional<Tag> tagOptional = tagRepository.findById(tag_id);
    if (tagOptional.isEmpty()) {
        return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND   );
    }
    List<Transaction> transactions = transactionRepository.findByTag(tagOptional.get());
    return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

//    Get specific transactions
    @GetMapping("/{id}")
    public ResponseEntity<?> getTransaction(@PathVariable Integer id) {
    Optional<Transaction> transaction = transactionRepository.findById(id);
    if (transaction.isEmpty()) {
        return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(transaction.get(), HttpStatus.OK);
    }

//    Update transaction
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable Integer id,
                                               @RequestBody @Valid Transaction transaction,
                                               @RequestParam(required = false) Integer budget_id,
                                               @RequestParam(required = false) Integer tag_id) {
    Optional<Transaction> existingTransactionOpt = transactionRepository.findById(id);
    if (existingTransactionOpt.isEmpty()) {
        return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
    }
    Transaction existingTransaction = existingTransactionOpt.get();
    existingTransaction.setAmount(transaction.getAmount());
    existingTransaction.setDescription(transaction.getDescription());
    existingTransaction.setIncome(transaction.isIncome());
    existingTransaction.setRecurring(transaction.isRecurring());

//    Update budget if provided
        if (budget_id != null) {
            Optional<Budget> budgetOptional = budgetRepository.findById(budget_id);
            if (budgetOptional.isEmpty()) {
                return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
            }
            existingTransaction.setBudgetId(budgetOptional.get());
        }

//        Update tag if provided
        if (tag_id != null) {
            Optional<Tag> tagOptional = tagRepository.findById(tag_id);
            if (tagOptional.isEmpty()) {
                return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND);
            }
            existingTransaction.setTag(tagOptional.get());
        }
        Transaction updatedTransaction = transactionRepository.save(existingTransaction);
        return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
    }

//    Delete transaction
    public ResponseEntity<?> deleteTransaction(@PathVariable Integer id) {
    Optional<Transaction> transaction = transactionRepository.findById(id);
    if (transaction.isEmpty()) {
        return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
    }
    transactionRepository.deleteById(id);
    return new ResponseEntity<>("Transaction deleted successfully", HttpStatus.OK);
    }

























}
