package com.lakshyajit.notes.util;

import com.lakshyajit.notes.model.Notes;
import com.lakshyajit.notes.payload.NotesResponse;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ModelMapper {

    public static NotesResponse mapNoteToNoteResponse(Notes note) {

        NotesResponse notesResponse = new NotesResponse(
                note.getId(),
                note.getTitle(),
                note.getDescription(),
                note.getStatus(),
                note.getAuthor(),
                note.getCreatedAt(),
                note.getUpdatedAt(),
                note.getPriority(),
                note.getDueDate()
        );



        return notesResponse;
    }
}
