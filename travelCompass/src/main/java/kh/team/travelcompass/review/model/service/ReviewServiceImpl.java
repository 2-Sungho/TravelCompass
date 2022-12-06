package kh.team.travelcompass.review.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.team.travelcompass.common.Util;
import kh.team.travelcompass.place.model.vo.Pagination;
import kh.team.travelcompass.review.model.dao.ReviewDAO;
import kh.team.travelcompass.review.model.vo.Review;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewDAO dao;

	// 처음 리뷰 목록 조회 + 페이징 처리
	@Override
	public Map<String, Object> selectReviewList(String contentid, Map<String, Object> paramMap, int cp) {

		// 1. 특정 게시판의 전체 게시글 수 조회(단, 삭제 제외)
		int listCount = dao.getListCount(contentid);

		// 2. 전체 게시글 수 + cp(현제 페이지)이용해서
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp);

		// 3. 페이징 처리객체를 이용해서 게시글 목록 조회
		List<Review> reviewList = dao.selectReviewList(pagination, paramMap);

		Map<String, Object> reviewMap = new HashMap<String, Object>();
		reviewMap.put("pagination", pagination);
		reviewMap.put("reviewList", reviewList);

		return reviewMap;
	}

	// 리뷰 정렬 조회 (추천, 평점, 날짜 순)
	@Override
	public Map<String, Object> orderReviewList(String contentid, Map<String, Object> paramMap, int cp) {

		// 1. 검색 조건이 일치하는 전체 게시글 수 조회(단, 삭제 제외)
		int listCount = dao.getListCount(contentid);

		// 2. 검색 조건일치 게시글 수 + cp(현제 페이지)이용해서
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp);

		// 3. 페이징 처리객체를 이용해서 게시글 목록 조회
		List<Review> reviewList = dao.orderReviewList(pagination, paramMap);

		Map<String, Object> reviewMap = new HashMap<String, Object>();
		reviewMap.put("pagination", pagination);
		reviewMap.put("reviewList", reviewList);

		return reviewMap;
	}

	// 리뷰 삽입(작성)
	@Override
	public int insertReview(Review review) {

		// XSS 방지, 개행문자 처리
		review.setReviewTitle(Util.XSSHandling(review.getReviewTitle()));
		review.setReviewContent(Util.XSSHandling(review.getReviewContent()));

		review.setReviewContent(Util.newLineHandling(review.getReviewContent()));

		return dao.insertReview(review);
	}

	// 리뷰 삭제
	@Override
	public int deleteReview(int reviewNo) {
		return dao.deleteReview(reviewNo);
	}

	// 평균 리뷰 평점 조회
	@Override
	public double selectAvgRating(String contentId) {
		return dao.selectAvgRating(contentId);
	}

	// 작성된 리뷰 개수 조회
	@Override
	public int selectReviewCount(String contentId) {
		return dao.selectReviewCount(contentId);
	}

	@Override
	public int updateReview(Review review) {
		// XSS 방지, 개행문자 처리
		review.setReviewTitle(Util.XSSHandling(review.getReviewTitle()));
		review.setReviewContent(Util.XSSHandling(review.getReviewContent()));

		review.setReviewContent(Util.newLineHandling(review.getReviewContent()));
		
		return dao.updateReview(review);
	}
	
	@Override
	public List<Map<String, Integer>> countRating(String contentid) {
		return dao.countRating(contentid);
	}
}
