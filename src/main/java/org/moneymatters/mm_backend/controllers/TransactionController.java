package org.moneymatters.mm_backend.controllers;

import jakarta.validation.Valid;
import org.moneymatters.mm_backend.data.*;
import org.moneymatters.mm_backend.models.*;
import org.moneymatters.mm_backend.models.dto.IncomeSplitDto;
import org.moneymatters.mm_backend.models.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RecurringTransactionRepository recurringTransactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private SplitRepository splitRepository;


//    Create transaction with budget and tag assignment options
@PostMapping("/add")
    public ResponseEntity<?> addTransaction(@RequestBody @Valid TransactionDTO transactionDTO,
                                            @RequestParam Integer user_id,
                                            @RequestParam(required = false) Integer budget_id,
                                            @RequestParam(required = false) Integer tag_id) {

    Transaction transaction = new Transaction();
    transaction.setAmount(transactionDTO.getAmount());
    transaction.setDescription(transactionDTO.getDescription());
    transaction.setRecurring(transactionDTO.isRecurring());
    transaction.setIsIncome(transactionDTO.isIncome());

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

    if (transaction.isRecurring()){
        RecurringTransaction recurringTransaction= new RecurringTransaction();
        recurringTransaction.setTransaction(transaction);
        recurringTransaction.setRecurringDay(transactionDTO.getRecurringDate());
        recurringTransaction.setTag(transaction.getTag());

        recurringTransactionRepository.save(recurringTransaction);
    }
    Transaction savedTransaction = transactionRepository.save(transaction);

    if(transactionDTO.getSplits() != null && !transactionDTO.getSplits().isEmpty()){
        for(TransactionDTO.SplitDto splitDto: transactionDTO.getSplits()){
            double splitAmount = splitDto.getSplitAmount();
            String tag = splitDto.getTag();

            Optional<Tag> tagOptional = tagRepository.findById(tag_id);
            if(tagOptional.isEmpty()){
                return new ResponseEntity<>("Tag not found for id: " + splitDto.getTag(),HttpStatus.NOT_FOUND);
            }

            Split split = new Split();
            split.setSplitAmount(splitDto.getSplitAmount());
            split.setTag(tagOptional.get());
            split.setTransaction(savedTransaction);

            splitRepository.save(split);
        }
    }
    return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
}

//      View all transactions for a user
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getUserTransactions(@PathVariable Integer user_id) {
    Optional<User> userOptional = userRepository.findById(user_id);
    if (userOptional.isEmpty()) {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
        List<Transaction> transactions = transactionRepository.findByUser(userOptional.get());
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    // Income split endpoint
    @PostMapping("/split-income")
    public ResponseEntity<?> splitIncome(@RequestBody IncomeSplitDto incomeSplitDto) {
        double totalIncome = incomeSplitDto.getTotalIncome();
        Map<String, Double> allocations = incomeSplitDto.getAllocations();

        // Create transaction for each category split
        for (Map.Entry<String, Double> entry : allocations.entrySet()) {
            String tagName = entry.getKey();
            Double percentage = entry.getValue();

            // Calculate the split amount
            double splitAmount = (percentage / 100) * totalIncome;

            // Fetch the corresponding tag by name
            Optional<Tag> tagOptional = tagRepository.findByName(tagName);
            if (tagOptional.isEmpty()) {
                return new ResponseEntity<>("Tag not found for name: " + tagName, HttpStatus.NOT_FOUND);
            }
            Tag tag = tagOptional.get();

            // Create the transaction for the split
            Transaction transaction = new Transaction();
            transaction.setAmount(splitAmount);
            transaction.setDescription("Income split for " + tag.getName());
            transaction.setIsIncome(true);  // Set as income
            transaction.setTag(tag);

            // Save the transaction
            transactionRepository.save(transaction);
        }

        return new ResponseEntity<>("Income successfully split into categories", HttpStatus.CREATED);

}

//    View all transactions by specific budget
    @GetMapping("/budget/{budget_id}")
    public ResponseEntity<?> getBudgetTransactions(@PathVariable Integer budget_id) {
    Optional<Budget> budgetOptional = budgetRepository.findById(budget_id);
    if (budgetOptional.isEmpty()) {
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }
    List<Transaction> transactions = transactionRepository.findByBudget(budgetOptional.get());
    return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

//    View transactions by specific tag
    @GetMapping("/tag/{tag_id}")
    public ResponseEntity<?> getTagTransactions(@PathVariable Integer tag_id) {
    Optional<Tag> tagOptional = tagRepository.findById(tag_id);
    if (tagOptional.isEmpty()) {
        return new ResponseEntity<>("Tag not found", HttpStatus.NOT_FOUND   );
    }
    List<Transaction> transactions = transactionRepository.findByTag(tagOptional.get());
    return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

//    View details of specific transaction
    @GetMapping("/view/{id}")
    public ResponseEntity<?> getTransaction(@PathVariable Integer id) {
    Optional<Transaction> transaction = transactionRepository.findById(id);
    if (transaction.isEmpty()) {
        return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(transaction.get(), HttpStatus.OK);
    }

//    Update transaction with budget and tag reassignments
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable Integer id,
                                               @RequestBody @Valid Transaction transaction,
                                               @RequestParam(required = false) Integer budget_id,
                                               @RequestParam(required = false) Integer tag_id) {
//        Verify transaction exists
    Optional<Transaction> existingTransactionOpt = transactionRepository.findById(id);
    if (existingTransactionOpt.isEmpty()) {
        return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
    }

    Transaction existingTransaction = existingTransactionOpt.get();
    existingTransaction.setAmount(transaction.getAmount());
    existingTransaction.setDescription(transaction.getDescription());
    existingTransaction.setIsIncome(transaction.isIncome());
    existingTransaction.setRecurring(transaction.isRecurring());

        if (budget_id != null) {
            Optional<Budget> budgetOptional = budgetRepository.findById(budget_id);
            if (budgetOptional.isEmpty()) {
                return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
            }
            existingTransaction.setBudgetId(budgetOptional.get());
        }

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

//    Delete a transaction
@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Integer id) {
    Optional<Transaction> transactionOptional = transactionRepository.findById(id);
    if (transactionOptional.isEmpty()) {
        return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
    }
    transactionRepository.deleteById(id);
    return new ResponseEntity<>("Transaction deleted successfully", HttpStatus.OK);
}
}
