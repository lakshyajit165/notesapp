package com.lakshyajit.notes.repository;

import com.lakshyajit.notes.model.Notes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

    Optional<Notes> findById(Long noteId);

    Page<Notes> findByAuthor(String authorMail, Pageable pageable);

    long countByAuthor(String authorMail);

}
