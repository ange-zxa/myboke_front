package com.blog.repository;

import com.blog.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostSlugOrderByCreatedAtDesc(String postSlug);
}
