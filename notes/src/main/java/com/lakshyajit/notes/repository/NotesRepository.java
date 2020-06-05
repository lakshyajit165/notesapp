package com.lakshyajit.notes.repository;

import com.lakshyajit.notes.model.Notes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

    Optional<Notes> findById(Long noteId);

    // note that the table name in the custom query is NOT 'notes' but 'Notes'
    // because in JPA/Hibernate, you use the names of the types, not the tables.
    @Query(value = "SELECT n FROM Notes n WHERE author = :authorEmail AND status != 'COMPLETED'")
    Page<Notes> findByAuthor(@Param("authorEmail") String authorMail, Pageable pageable);

    @Query(value = "SELECT n from Notes n WHERE author = :authorEmail AND status = 'COMPLETED'")
    Page<Notes> findByStatusCompleted(@Param("authorEmail") String authorMail, Pageable pageable);

    long countByAuthor(String authorMail);

}
