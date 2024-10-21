package com.example.autjwt.service;

import com.example.autjwt.dto.CommentDTO;
import org.springframework.stereotype.Service;

@Service
public interface CommentsService {

    CommentDTO addComment(Long id, CommentDTO commentDTO);
}
