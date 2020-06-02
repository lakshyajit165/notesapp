package com.lakshyajit.notes.payload;

import com.lakshyajit.notes.model.Priority;
import com.lakshyajit.notes.model.Status;
import org.hibernate.annotations.NaturalId;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

public class NotesRequest {

    @NotBlank
    @Size(max = 80)
    private String title;

    @NotBlank
    @Size(max = 200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 60)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(length = 60)
    private Priority priority;

    @Column
    private String dueDate;

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
}

