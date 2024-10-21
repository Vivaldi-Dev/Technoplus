package com.example.autjwt.mapper;

import com.example.autjwt.dto.CommentDTO;
import com.example.autjwt.entity.Comment;

public class CommentsMapper {

    public static CommentDTO commentToCommentDTO(Comment comment) {
        if (comment == null) {
            return null;
        }

        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                comment.getAuthor(),
                comment.getBlog() != null ? comment.getBlog().getId() : null
        );
    }

    public static Comment toComment(CommentDTO commentDTO) {
        if (commentDTO == null) {
            return null;
        }
        return Comment.builder()
                .id(commentDTO.getId())
                .content(commentDTO.getContent())
                .author(commentDTO.getAuthor())
                .build();
    }
}
