package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository<User> extends CrudRepository<User, Integer> {
}
