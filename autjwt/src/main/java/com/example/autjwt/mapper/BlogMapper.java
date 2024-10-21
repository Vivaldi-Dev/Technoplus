package com.example.autjwt.mapper;

import com.example.autjwt.dto.BlogDto;
import com.example.autjwt.dto.CommentDTO;
import com.example.autjwt.entity.Blog;
import com.example.autjwt.entity.Comment;

import java.util.List;
import java.util.stream.Collectors;

public class BlogMapper {

    public static BlogDto toBlogDto(Blog blog) {
        if (blog == null) {
            return null;
        }

        BlogDto blogDto = new BlogDto();
        blogDto.setId(blog.getId());
        blogDto.setTitle(blog.getTitle());
        blogDto.setContent(blog.getContent());
        blogDto.setAuthor(blog.getAuthor());
        blogDto.setCreatedAt(blog.getCreatedAt());

        if (blog.getComments() != null) {
            List<CommentDTO> commentDTOs = blog.getComments().stream()
                    .map(comment -> new CommentDTO(comment.getId(), comment.getContent(), comment.getAuthor(), blog.getId()))
                    .collect(Collectors.toList());
            blogDto.setComments(commentDTOs);
        }

        return blogDto;
    }

    public static Blog toBlog(BlogDto blogDto) {
        if (blogDto == null) {
            return null;
        }

        Blog blog = new Blog();
        blog.setId(blogDto.getId());
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setAuthor(blogDto.getAuthor());
        blog.setCreatedAt(blogDto.getCreatedAt());

        if (blogDto.getComments() != null) {
            List<Comment> comments = blogDto.getComments().stream()
                    .map(commentDTO -> Comment.builder()
                            .id(commentDTO.getId())
                            .content(commentDTO.getContent())
                            .author(commentDTO.getAuthor())
                            .blog(blog)
                            .build())
                    .collect(Collectors.toList());
            blog.setComments(comments);
        }

        return blog;
    }

}
