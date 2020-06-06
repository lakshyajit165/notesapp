package com.lakshyajit.notes.controller;

import com.lakshyajit.notes.exception.BadRequestException;
import com.lakshyajit.notes.model.Notes;
import com.lakshyajit.notes.model.Priority;
import com.lakshyajit.notes.model.Status;
import com.lakshyajit.notes.payload.ApiResponse;
import com.lakshyajit.notes.payload.NotesRequest;
import com.lakshyajit.notes.payload.NotesResponse;
import com.lakshyajit.notes.payload.PagedResponse;
import com.lakshyajit.notes.security.CurrentUser;
import com.lakshyajit.notes.security.UserPrincipal;
import com.lakshyajit.notes.service.NotesService;
import com.lakshyajit.notes.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/notes")
public class NotesController {

    private NotesService notesService;

    @Autowired
    public NotesController(NotesService notesService) {
        this.notesService = notesService;
    }

    // create a note
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createNote(@Valid @RequestBody NotesRequest notesRequest, @CurrentUser UserPrincipal currentUser) {

        try {
            Notes note = notesService.createNote(notesRequest, currentUser);

//            System.out.println(currentUser);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{noteId}")
                    .buildAndExpand(note.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "Note Created Successfully!"));
        }catch(ParseException e) {

            return ResponseEntity.badRequest().body(new ApiResponse(false, "Wrongly formatted date!"));
        }


    }

    // get a note by its id
    @GetMapping("/{noteId}")
    @PreAuthorize("hasRole('USER')")
    public NotesResponse getNoteById(@PathVariable Long noteId){

        return notesService.getNoteById(noteId);
    }

    // get all notes
    @GetMapping("/all")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<NotesResponse> getNotes(@CurrentUser UserPrincipal currentUser,
                                                 @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                 @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {

        return notesService.getAllNotes(currentUser, page, size);

    }

    // get notes by user
    @GetMapping("/mynotes")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<NotesResponse> getNotesByUser(@CurrentUser UserPrincipal currentUser,
                                                 @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                 @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {

        return notesService.getNotesByUser(currentUser, page, size);
    }

    // get completed notes by a user
    @GetMapping("/mynotes/completed")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<NotesResponse> getCompletedNotesByUser(@CurrentUser UserPrincipal currentUser,
                                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return notesService.getCompletedNotesByUser(currentUser, page, size);
    }

    // get notes by filter
    @GetMapping("/mynotes/filtered")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<NotesResponse> getFilteredNotesByUser(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size
            ) {
//        System.out.println("------------------------"+status+"-------------------------------");

        return notesService.getFilteredNotesByUser(currentUser, page, size, search, status, priority);
    }


    @PutMapping("/{noteId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateNote(@Valid @RequestBody NotesRequest notesRequest, @PathVariable Long noteId) {

        try {
            Notes note = notesService.updateNote(notesRequest, noteId);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{noteId}")
                    .buildAndExpand(note.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "Note updated successfully!"));
        }catch(ParseException e){

            return ResponseEntity.badRequest().body(new ApiResponse(false, "Wrongly formatted date!"));
        }
    }


    // Delete a note
    @DeleteMapping("/{noteId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteNote(@PathVariable Long noteId){
        if(notesService.deleteNote(noteId)){
            return ResponseEntity.ok()
                    .body(new ApiResponse(true, "Note deleted successfully!"));
        }else{
            return ResponseEntity.status(400)
                    .body(new ApiResponse(false, "An error occurred!"));
        }
    }
}
