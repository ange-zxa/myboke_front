package com.blog.service;

import com.blog.model.Comment;
import com.blog.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getComments(String postSlug) {
        return commentRepository.findByPostSlugOrderByCreatedAtDesc(postSlug);
    }

    public Comment createComment(Comment comment) {
        comment.setId(null);
        comment.setCreatedAt(new Date());
        return commentRepository.save(comment);
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
