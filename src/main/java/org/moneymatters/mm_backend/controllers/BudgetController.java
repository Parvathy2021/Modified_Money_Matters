package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.*;
import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.moneymatters.mm_backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
@Validated
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;
//
//    @Autowired
//    private TransactionRepository transactionRepository;
//
//    @Autowired
//    private RecurringTransactionRepository recurringTransactionRepository;
//
//    @Autowired
//    private TagRepository tagRepository;


//  Get all budgets
    @GetMapping
public ResponseEntity<List<Budget>> getAllBudgets() {
    List<Budget> budgets = (List<Budget>) budgetRepository.findAll();
    return new ResponseEntity<>(budgets, HttpStatus.OK);
}

//  Get budget by ID
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Integer id) {
    Optional<Budget> budget = budgetRepository.findById(id);
    if (budget.isPresent()) {
        return new ResponseEntity<>(budget.get(), HttpStatus.OK);
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found with id: " + id);
    }

//  Create new budget
    @PostMapping
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget) {
        try {
            Budget newBudget = budgetRepository.save(budget);
            return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid budget data: " + e.getMessage() );
        }
    }

//  Delete budget
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBudget(@PathVariable Integer id) {
        try {
            Optional<Budget> budget = budgetRepository.findById(id);
            if (budget.isPresent()) {
                budgetRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found with id: " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting budget: " + e.getMessage());
        }
}
}


