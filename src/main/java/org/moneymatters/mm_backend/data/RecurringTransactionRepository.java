package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecurringTransactionRepository extends CrudRepository<RecurringTransaction, Integer> {
    List<RecurringTransaction> findByBudget(Budget budget);
}
