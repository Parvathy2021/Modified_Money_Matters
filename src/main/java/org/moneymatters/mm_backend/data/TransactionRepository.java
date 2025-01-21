package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
    List<Transaction> findByUser(org.moneymatters.mm_backend.models.User user);
    List<Transaction> findByBudget(org.moneymatters.mm_backend.models.Budget budget);
    List<Transaction> findByTag(org.moneymatters.mm_backend.models.Tag tag);
    List<Transaction> findByUserAndIsRecurring(org.moneymatters.mm_backend.models.User user, boolean isRecurring);
}
