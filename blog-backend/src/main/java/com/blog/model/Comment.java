package com.blog.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "comments")
@Data
public class Comment {
    @Id
    private String id;

    @Indexed
    private String postSlug;

    private String author;

    private String email;

    private String content;

    private Date createdAt;

    private String parentId;
}
