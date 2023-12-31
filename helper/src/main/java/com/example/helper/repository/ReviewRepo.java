package com.example.helper.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.helper.entity.Review;

@Repository
public interface ReviewRepo  extends JpaRepository<Review, Long>{
	Page<Review> findAll(Specification<Review> specification, Pageable pageable);
}
