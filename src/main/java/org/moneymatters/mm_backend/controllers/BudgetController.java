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

//    Temporary in-memory storage for testing
    private List<Budget> budgets = new ArrayList<>();

//    Test endpoint for GET request
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("BudgetController is working!", HttpStatus.OK);
    }

//    Retreive all budgets (mock response)
    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

//    Create new budget (mock saving and response)
    @PostMapping
    public ResponseEntity<String> createBudget(@RequestBody Budget budget) {
        budgets.add(budget);
        return new ResponseEntity<>("Budget received: " + budget.getName(), HttpStatus.CREATED);
    }
//
//
////  Get all budgets
//@GetMapping
//public ResponseEntity<List<Budget>> getAllBudgets() {
//    List<Budget> budgets = (List<Budget>) budgetRepository.findAll();
//    return new ResponseEntity<>(budgets, HttpStatus.OK);
//}
//
////  Get budget by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Budget> getBudgetById(@PathVariable int id) {
//        Budget budget = budgetRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found with id: " + id));
//        return ResponseEntity.ok(budget);
//    }
//
////  Create new budget
//@PostMapping
//public ResponseEntity<Budget> createBudget(@RequestBody Map<String, Object> payload) {
//    // Extract name and user_id from the payload
//    String name = (String) payload.get("name");
//    int userId = (int) payload.get("user_id");
//
//    // Validate user existence
//    User user = userRepository.findById(userId)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + userId));
//
//    // Create a new budget and associate the user
//    Budget budget = new Budget(name, user);
//    Budget savedBudget = budgetRepository.save(budget);
//
//    return new ResponseEntity<>(savedBudget, HttpStatus.CREATED);
//}
//
////    @PutMapping("/{id}")
////    public ResponseEntity<Budget> updateBudget(@PathVariable int id, @RequestBody @Valid Budget budgetDetails) {
////        Budget existingBudget = budgetRepository.findById(id)
////                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found with id: " + id));
////
////        // Update the budget fields
////        existingBudget.setName(budgetDetails.getName());
//////        existingBudget.setAmount(budgetDetails.getAmount());
//////        existingBudget.setUser(budgetDetails.getUser());
////        // Save the updated budget
////        Budget updatedBudget = budgetRepository.save(existingBudget);
////        return ResponseEntity.ok(updatedBudget);
////    }
//
////  Delete budget
//@DeleteMapping("/{id}")
//public ResponseEntity<Void> deleteBudget(@PathVariable int id) {
//    Budget existingBudget = budgetRepository.findById(id)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found with id: " + id));
//
//    budgetRepository.delete(existingBudget);
//    return ResponseEntity.noContent().build();
//}
}


