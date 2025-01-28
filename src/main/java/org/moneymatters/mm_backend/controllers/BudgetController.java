package org.moneymatters.mm_backend.controllers;

import jakarta.validation.Valid;
import org.moneymatters.mm_backend.data.*;
import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.moneymatters.mm_backend.models.Transaction;
import org.moneymatters.mm_backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RecurringTransactionRepository recurringTransactionRepository;

    @Autowired
    private TagRepository tagRepository;

//    Get all budgets in the system
    @GetMapping("/list")
    public ResponseEntity<?> getAllBudgets() {
        List<Budget> budgets = (List<Budget>) budgetRepository.findAll();
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

//    Create new budget
    @PostMapping("/add")
    public ResponseEntity<?> addBudget(@RequestBody @Valid Budget budget,
                                          @RequestParam Integer user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        budget.setUser(userOptional.get());
        Budget savedBudget = budgetRepository.save(budget);
        return new ResponseEntity<>(savedBudget, HttpStatus.CREATED);
    }

//     View all budgets for specific user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getUserBudgets(@PathVariable Integer user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        List<Budget> budgets = budgetRepository.findByUser(userOptional.get());
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

//    View a single budget with its transactions
@GetMapping("/view/{id}")
public ResponseEntity<?> getBudget(@PathVariable Integer id) {
    Optional<Budget> budgetOptional = budgetRepository.findById(id);
    if (budgetOptional.isEmpty()) {
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }
    Budget budget = budgetOptional.get();

//    Find both regular and recurring transactions using the budget entity
    List<Transaction> transactions = transactionRepository.findByBudget(budget);
    List<RecurringTransaction> recurringTransactions = recurringTransactionRepository.findByBudget(budget);

    BudgetDetailsResponse response = new BudgetDetailsResponse(budget, transactions, recurringTransactions);
    return new ResponseEntity<>(response, HttpStatus.OK);
}

//    Update an existing budget
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBudget(@PathVariable Integer id,
                                          @RequestBody @Valid Budget updatedBudget) {
        Optional<Budget> budgetOptional = budgetRepository.findById(id);
        if (budgetOptional.isEmpty()) {
            return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
        }
        Budget existingBudget = budgetOptional.get();
        existingBudget.setName(updatedBudget.getName());
        Budget savedBudget = budgetRepository.save(existingBudget);
        return new ResponseEntity<>(savedBudget, HttpStatus.OK);
    }

//    Delete a budget and handle its associated transactions
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable Integer id) {
        Optional<Budget> budgetOptional = budgetRepository.findById(id);
        if (budgetOptional.isEmpty()) {
            return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
        }
        Budget budget = budgetOptional.get();

//        Find and update all associated transacctions
        List<Transaction> transactions = transactionRepository.findByBudget(budget);
        for (Transaction transaction : transactions) {
            transaction.setBudgetId(null);
            transactionRepository.save(transaction);
        }

//        Find and update all associated recurring transactions
        List<RecurringTransaction> recurringTransactions = recurringTransactionRepository.findByBudget(budget);
        for (RecurringTransaction rt : recurringTransactions) {
            rt.setBudgetId(null);
            recurringTransactionRepository.save(rt);
        }

//        Delete the budget
        budgetRepository.deleteById(id);
        return new ResponseEntity<>("Budget deleted successfully", HttpStatus.OK);
    }


    private static class BudgetDetailsResponse{
        private final Budget budget;
        private final List<Transaction> transactions;
        private final List<RecurringTransaction> recurringTransactions;

        public BudgetDetailsResponse(Budget budget,
                                     List<Transaction> transactions,
                                     List<RecurringTransaction> recurringTransactions) {
            this.budget = budget;
            this.transactions = transactions;
            this.recurringTransactions = recurringTransactions;
        }

        public Budget getBudget() {
            return budget;
        }

        public List<Transaction> getTransactions() {
            return transactions;
        }

        public List<RecurringTransaction> getRecurringTransactions() {
            return recurringTransactions;
        }
}
}


