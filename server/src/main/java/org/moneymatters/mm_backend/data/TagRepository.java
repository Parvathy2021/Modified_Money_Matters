package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.Tag;
import org.moneymatters.mm_backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends CrudRepository<Tag, Integer> {
    List<Tag> findByUsers(User user);
    Optional<Tag> findByNameAndUsers(String name, User user);
    boolean existsByNameAndUsers(String name, User user);
    List<Tag> findByUsersAndIsDefaultTrue(User user);
    Optional<Tag> findByNameAndUsersAndIsDefaultTrue(String name, User user);
    Optional<Tag>findByName(String name);
}
