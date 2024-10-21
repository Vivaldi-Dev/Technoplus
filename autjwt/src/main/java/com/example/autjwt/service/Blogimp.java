package com.example.autjwt.service;

import com.example.autjwt.dto.BlogDto;
import com.example.autjwt.entity.Blog;
import com.example.autjwt.mapper.BlogMapper;
import com.example.autjwt.repository.BlogRepository;
import lombok.AllArgsConstructor;
import com.example.autjwt.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class Blogimp implements Blogservice{

    private BlogRepository blogRepository;

    @Override
    public BlogDto createBlog(BlogDto blogDto) {

        Blog blog = BlogMapper.toBlog(blogDto);
        Blog blogSaved = blogRepository.save(blog);
        return BlogMapper.toBlogDto(blogSaved);
    }

    @Override
    public BlogDto getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> {
                    System.out.println("Blog not found: " + id);
                    return new ResourceNotFoundException("Blog post with id: " + id + " not found");
                });
        return BlogMapper.toBlogDto(blog);
    }

    @Override
    public BlogDto updateBlog(Long id, BlogDto blogDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "Employee is not exists with given ID: " + id
        ));

        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setAuthor(blogDto.getAuthor());
        blog.setCreatedAt(blogDto.getCreatedAt());
        Blog blogSaved = blogRepository.save(blog);
        return BlogMapper.toBlogDto(blogSaved);
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "Employee is not exists with given ID: " + id
        ));
        blogRepository.deleteById(id);
    }

    @Override
    public List<BlogDto> getallBlog() {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream().map((BlogMapper::toBlogDto)).collect(Collectors.toList());

    }
}
