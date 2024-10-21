package com.example.autjwt.service;

import com.example.autjwt.dto.CommentDTO;
import com.example.autjwt.entity.Blog;
import com.example.autjwt.entity.Comment;
import com.example.autjwt.exception.ResourceNotFoundException;
import com.example.autjwt.mapper.CommentsMapper;
import com.example.autjwt.repository.BlogRepository;
import com.example.autjwt.repository.CommentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentsImpl implements CommentsService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    @Override
    public CommentDTO addComment(Long id, CommentDTO commentDTO) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        Comment comment = CommentsMapper.toComment(commentDTO);
        comment.setBlog(blog);
        Comment savedComment = commentRepository.save(comment);

        return CommentsMapper.commentToCommentDTO(savedComment);
    }
}
