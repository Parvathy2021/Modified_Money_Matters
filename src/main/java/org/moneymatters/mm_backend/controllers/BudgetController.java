package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.*;
import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budgets")
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

//    Placeholder for creating new budget
    @PostMapping
    public String createBudget() {
        return "Create budget endpoint";
    }

//    Placeholder for retrieving all budgets
    @GetMapping
    public String getAllBudgets() {
        return "Retrieve all budgets endpoint";
    }

//    Placeholder for retrieving specific budget by ID
    @GetMapping("/{id}")
    public String getBudgetById(@PathVariable int id) {
        return "Retrieve budget by Id endpoint";
    }

//    Placeholder for updating budget
    @PutMapping("/{id")
    public String updateBudget(@PathVariable int id) {
        return "Update budget endpoint";
    }

//    Placeholder for deleting a budget
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable int id) {
        return "Delete budget endpoint";
    }
}


