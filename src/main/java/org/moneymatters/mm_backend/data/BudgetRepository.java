package org.moneymatters.mm_backend.data;


import org.moneymatters.mm_backend.models.Budget;
import org.moneymatters.mm_backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends CrudRepository<Budget, Integer> {
    List<Budget> findByUser(User user);

}
