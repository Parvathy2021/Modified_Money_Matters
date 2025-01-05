package org.moneymatters.mm_backend.data;


import org.moneymatters.mm_backend.models.Budget;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends CrudRepository<Budget, Integer> {
}
