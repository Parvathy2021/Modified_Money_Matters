package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.*;
import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/budgets")
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

//    Tempoorary in-memory storage for testing
    private List<Budget> budgets = new ArrayList<>();
    private int idCounter = 1;      //Simulating auto-incrementing ID

//    Test endpoint for GET request
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("BudgetController is working!", HttpStatus.OK);
    }

//     Retrieve all budgets
    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

//    Retrieve a single budget by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getBudgetById(@PathVariable int id) {
        Optional<Budget> budget = budgets.stream().filter(b -> b.getId() == id).findFirst();
        if (budget.isPresent()) {
            return ResponseEntity.ok(budget.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    Create a new budget
    @PostMapping
    public ResponseEntity<String> createBudget(@RequestBody Budget budget) {
        budget.setId(idCounter++); //Simulate auto-generated ID
        budgets.add(budget);
        return new ResponseEntity<>("Budget created: " + budget.getName(), HttpStatus.CREATED);
    }

//    Update an existing budget
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBudget(@PathVariable int id, @RequestBody Budget updatedBudget) {
        for (Budget budget : budgets) {
            if (budget.getId() == id) {
                budget.setName(updatedBudget.getName());
                return new ResponseEntity<>("Budget updated: " + budget.getName(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }

//    Delete a budget by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBudget(@PathVariable int id) {
        boolean removed = budgets.removeIf(b -> b.getId() == id);
        if (removed) {
            return new ResponseEntity<>("Budget deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
        }
    }
}


