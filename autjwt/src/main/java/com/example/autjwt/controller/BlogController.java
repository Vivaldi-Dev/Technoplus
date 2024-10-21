package com.example.autjwt.controller;


import com.example.autjwt.dto.BlogDto;
import com.example.autjwt.dto.CommentDTO;
import com.example.autjwt.service.Blogservice;
import com.example.autjwt.service.CommentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/blog")
public class BlogController {

    private Blogservice blogservice;
    private CommentsService commentsService;

    @GetMapping
    public ResponseEntity<List<BlogDto>> getAllBlogs() {
        blogservice.getallBlog();
        return  ResponseEntity.ok(blogservice.getallBlog());
    }

    @PostMapping("/create")
    public ResponseEntity<BlogDto> createBlog(@RequestBody BlogDto blogDto) {
        blogDto = blogservice.createBlog(blogDto);
        return ResponseEntity.ok(blogservice.createBlog(blogDto));
    }

    @GetMapping("{id}")
    public ResponseEntity<BlogDto> getBlogById(@PathVariable("id") Long id) {
        BlogDto blogDto = blogservice.getBlogById(id);
        return ResponseEntity.ok(blogDto);
    }

    @PutMapping("{id}")
    public ResponseEntity<BlogDto> updateBlog(@PathVariable("id") Long id, @RequestBody BlogDto blogDto) {
        BlogDto updatedBlogDto = blogservice.updateBlog(id, blogDto);
        return ResponseEntity.ok(updatedBlogDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BlogDto>deleteBlog(@PathVariable("id") Long id) {
        blogservice.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/comments/{id}")
    public ResponseEntity<CommentDTO> addComment(@PathVariable("id") Long blogId, @RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentsService.addComment(blogId, commentDTO);
        return ResponseEntity.ok(createdComment);

    }


}
