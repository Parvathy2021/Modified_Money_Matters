package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.RecurringTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurringTransactionRepository extends CrudRepository<RecurringTransaction, Integer> {
}
