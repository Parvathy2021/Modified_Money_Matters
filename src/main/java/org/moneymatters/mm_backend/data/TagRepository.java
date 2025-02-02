package org.moneymatters.mm_backend.data;

import org.moneymatters.mm_backend.models.Tag;
import org.moneymatters.mm_backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends CrudRepository<Tag, Integer> {
       Optional<Tag>findByName(String name);
}
