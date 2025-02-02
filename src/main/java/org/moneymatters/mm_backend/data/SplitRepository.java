package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.Split;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SplitRepository extends CrudRepository<Split, Integer> {

}
