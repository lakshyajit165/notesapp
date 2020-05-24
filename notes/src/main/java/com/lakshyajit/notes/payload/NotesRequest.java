package com.lakshyajit.notes.payload;

import com.lakshyajit.notes.model.Status;
import org.hibernate.annotations.NaturalId;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class NotesRequest {

    @NotBlank
    @Size(max = 80)
    private String title;

    @NotBlank
    @Size(max = 200)
    private String description;

    @NotBlank
    @Size(max = 40)
    private String author;

    @Enumerated(EnumType.STRING)
    @Column(length = 60)
    private Status status;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

