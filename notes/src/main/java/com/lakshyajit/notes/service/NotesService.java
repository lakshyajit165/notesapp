package com.lakshyajit.notes.service;

import com.lakshyajit.notes.exception.BadRequestException;
import com.lakshyajit.notes.exception.ResourceNotFoundException;
import com.lakshyajit.notes.model.Notes;
import com.lakshyajit.notes.payload.NotesRequest;
import com.lakshyajit.notes.payload.NotesResponse;
import com.lakshyajit.notes.payload.PagedResponse;
import com.lakshyajit.notes.repository.NotesRepository;
import com.lakshyajit.notes.security.UserPrincipal;
import com.lakshyajit.notes.util.AppConstants;
import com.lakshyajit.notes.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;

@Service
public class NotesService {

    @Autowired
    private NotesRepository notesRepository;

    private static final Logger logger = LoggerFactory.getLogger(NotesService.class);

    public Notes createNote(NotesRequest notesRequest) throws ParseException {

        Notes note = new Notes();
        note.setTitle(notesRequest.getTitle());
        note.setDescription(notesRequest.getDescription());
        note.setAuthor(notesRequest.getAuthor());
        note.setStatus(notesRequest.getStatus());
        note.setPriority(notesRequest.getPriority());

        // convert string date to Date object;

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        String dateInString = notesRequest.getDueDate();
        Date dueDate = formatter.parse(dateInString);
        note.setDueDate(dueDate);


        return notesRepository.save(note);

    }

    // get all notes

    public PagedResponse<NotesResponse> getAllNotes(UserPrincipal currentUser, int page, int size) {

        validatePageNumberAndSize(page, size);

        // Retrieve polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Notes> notes = notesRepository.findAll(pageable);

        if(notes.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), notes.getNumber(),
                    notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
        }

        List<NotesResponse> notesResponses = notes.map(note -> {
            return ModelMapper.mapNoteToNoteResponse(note);
        }).getContent();

        return new PagedResponse<>(
                notesResponses,
                notes.getNumber(),
                notes.getSize(),
                notes.getTotalElements(),
                notes.getTotalPages(),
                notes.isLast()
                );
    }

    public PagedResponse<NotesResponse> getNotesByUser(UserPrincipal currentUser, int page, int size) {

        validatePageNumberAndSize(page, size);

        String email = currentUser.getEmail();

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Notes> notes = notesRepository.findByAuthor(email, pageable);

        if(notes.getNumberOfElements() == 0 || email.equals("")) {
            return new PagedResponse<>(Collections.emptyList(), notes.getNumber(),
                    notes.getSize(), notes.getTotalElements(), notes.getTotalPages(), notes.isLast());
        }

        List<NotesResponse> notesResponses = notes.map(note -> {
            return ModelMapper.mapNoteToNoteResponse(note);
        }).getContent();

        return new PagedResponse<>(
                notesResponses,
                notes.getNumber(),
                notes.getSize(),
                notes.getTotalElements(),
                notes.getTotalPages(),
                notes.isLast()
        );

    }

    public NotesResponse getNoteById(Long noteId) {
        Notes note = notesRepository.findById(noteId).orElseThrow(
                () -> new ResourceNotFoundException("Note", "id", noteId)
        );

        return new NotesResponse(
                note.getId(),
                note.getTitle(),
                note.getDescription(),
                note.getStatus(),
                note.getAuthor(),
                note.getCreatedAt(),
                note.getUpdatedAt(),
                note.getPriority(),
                note.getDueDate());

    }

    public Notes updateNote(NotesRequest notesRequest, Long noteId) throws ParseException {

        if(notesRepository.existsById(noteId)){
            Instant now = Instant.now();
            Notes presentNote = notesRepository.findById(noteId).get();

            presentNote.setUpdatedAt(now);
            presentNote.setTitle(notesRequest.getTitle());
            presentNote.setDescription(notesRequest.getDescription());
            presentNote.setStatus(notesRequest.getStatus());
            presentNote.setPriority(notesRequest.getPriority());

            // convert string date to Date object;
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
            String dateInString = notesRequest.getDueDate();
            Date dueDate = formatter.parse(dateInString);
            presentNote.setDueDate(dueDate);

            return notesRepository.save(presentNote);

        }else{
            throw new ResourceNotFoundException("Note", "id", noteId);
        }
    }



    public Boolean deleteNote(Long noteId){

        Optional<Notes> note = notesRepository.findById(noteId);

        if(note.isPresent()){
            notesRepository.deleteById(noteId);
            return true;
        }else{
            throw new ResourceNotFoundException("Note", "id", noteId);
        }
    }

    private void validatePageNumberAndSize(int page, int size) {

        if(page < 0){
            throw new BadRequestException("Page size cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than "+AppConstants.MAX_PAGE_SIZE);
        }
    }
}
