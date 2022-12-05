/* 리뷰 작성 등록 */
const addReview = document.getElementById("addReview");
const reviewTitle = document.getElementById("reviewTitle");
const reviewContent = document.getElementById("reviewContent");

const submitReview = document.getElementById("reviewform");

addReview.addEventListener("click", () => {
  console.log("비동기 리뷰 작성");
  // 로그인 확인
  if (memberNo == "") {
    // 로그인X
    if (confirm("로그인하시겠습니까?")) {
      location.href = "/member/login";
    } else {
      // alert("로그인 후 이용해주세요");
    }
    return;
  }

  if (reviewTitle.value.trim().length == 0) {
    alert("제목을 입력해주세요");
    reviewTitle.focus();

    return;
  }

  if (reviewContent.value.trim().length == 0) {
    alert("내용을 입력해주세요");
    reviewContent.focus();

    return;
  }

  console.log("비동기 리뷰 작성");
  // 비동기화 리뷰 작성(등록)
  $.ajax({
    url: "/review/insert",
    data: {
      rating: document.querySelector('input[name="rating"]:checked').value,
      reviewTitle: reviewTitle.value,
      reviewContent: reviewContent.value,
      memberNo: memberNo,
      contentid: contentid,
      contenttypeid: contenttypeid,
    },
    type: "post",
    success: (result) => {
      if (result > 0) {
        //댓글 등록 성공
        reviewTitle.value = "";
        reviewContent.value = "";

        selectReview(); // 비동기 리뷰 목록 조회 함수 호출
        // -> 새로운 리뷰 추가
      } else {
        // 실패
        alert("리뷰 등록에 실패했습니다");
      }
    },

    error: function (req, status, error) {
      console.log("리뷰 등록 에러");
    },
  });
});

// 프로필 페이지의 피드 버튼 눌렀을 때 사진 유무의 리뷰들 불러오는 비동기

function selectReviewList(e) {
  $.ajax({
    url: "/review/insert",
    type: "GET",
    dataType: "JSON",
    success: (reviewList) => {
      const ulreviewList = document.getElementById("review-list");
      ulreviewList.innerHTML = "";

      for (let list of reviewList) {
        const reviewTextColum = document.createElement("li");
        reviewTextColum.classList.add("user-page-review-colums2");

        const reviewTextHeaderStyle = document.createElement("div");
        reviewTextHeaderStyle.classList.add("user-page-review-header-style");

        const reviewTextHeaderLayout = document.createElement("div");
        reviewTextHeaderLayout.classList.add("user-page-review-header-layout");

        const reviewTextUserImage = document.createElement("a");
        reviewTextUserImage.classList.add("review-user-image");

        reviewTextUserImage.innerHTML = '<img src="' + list.profileImage + '">';

        const reviewTextInfoLayout = document.createElement("div");
        reviewTextInfoLayout.classList.add("review-user-info-layout");

        const reviewInfoNickname = document.createElement("span");
        reviewInfoNickname.classList.add("review-user-nickname");

        reviewInfoNickname.innerHTML =
          "<a href='#'>" + list.memberNickname + "</a>";

        const reviewInfoDateLink = document.createElement("a");
        reviewInfoDateLink.classList.add("review-user-dday");

        reviewInfoDateLink.innerText = list.reviewDate;

        const reviewTextDotStyle = document.createElement("button");
        reviewTextDotStyle.classList.add("user-page-review-dot-style");
        reviewTextDotStyle.innerHTML = "<i class='fa-solid fa-ellipsis' ></i>";

        const reviewTextDotDownMenu = document.createElement("div");
        reviewTextDotDownMenu.classList.add("user-page-review-dot-down-menu");

        const reviewTextDownMenu = document.createElement("ul");
        reviewTextDownMenu.classList.add("down-menu");

        const reviewTextDownMenu_li1 = document.createElement("li");
        reviewTextDownMenu_li1.innerHTML = "<li><a href='#'>수정</a></li>";

        const reviewTextDownMenu_li2 = document.createElement("li");
        reviewTextDownMenu_li2.innerHTML = "<li><a href='#'>삭제</a></li>";

        // 드랍 다운 메뉴 이벤트 삽입
        reviewTextDotStyle.addEventListener("click", () => {
          reviewTextDotStyle.nextElementSibling.style.display = "block";
        });
        reviewTextDotStyle.addEventListener("blur", () => {
          reviewTextDotStyle.nextElementSibling.style.display = "none";
        });

        const reviewTextDataTableStyle = document.createElement("div");
        reviewTextDataTableStyle.classList.add("review-data-table-style");

        const reviewTextPoint = document.createElement("div");
        reviewTextPoint.classList.add("review-point");

        const reviewText_span1 = document.createElement("span");
        reviewText_span1.innerHTML = "<i class='fa-solid fa-circle'></i>";

        const reviewText_span2 = document.createElement("span");
        reviewText_span2.innerHTML = "<i class='fa-solid fa-circle'></i>";

        const reviewText_span3 = document.createElement("span");
        reviewText_span3.innerHTML = "<i class='fa-solid fa-circle'></i>";

        const reviewText_span4 = document.createElement("span");
        reviewText_span4.innerHTML = "<i class='fa-solid fa-circle'></i>";

        const reviewText_span5 = document.createElement("span");
        reviewText_span5.innerHTML = "<i class='fa-solid fa-circle'></i>";

        const reviewTextTitle = document.createElement("div");
        reviewTextTitle.classList.add("review-title");

        reviewTextTitle.innerText = list.reviewTitle;

        const reviewTextContent = document.createElement("div");
        reviewTextContent.classList.add("review-content");

        reviewTextContent.innerText = '"' + list.reviewContent + '"';

        const reviewTextSupport = document.createElement("div");
        reviewTextSupport.classList.add("review-support");

        const reviewTextBottomMenu = document.createElement("div");
        reviewTextBottomMenu.classList.add("review-bottom-menu-style");

        const reviewTextSuportButton = document.createElement("div");
        reviewTextSuportButton.classList.add("suport-button");
        reviewTextSuportButton.innerHTML =
          "<i class='fa-regular fa-thumbs-up'></i>도움이 됨";

        const reviewTextSaveButton = document.createElement("div");
        reviewTextSaveButton.classList.add("save-button");
        reviewTextSaveButton.innerHTML =
          "<i class='fa-solid fa-heart'></i>저장";

        const reviewTextShareButton = document.createElement("div");
        reviewTextShareButton.classList.add("share-button");
        reviewTextShareButton.innerHTML =
          "<i class='fa-solid fa-arrow-up-from-bracket'></i>공유";
      }
    },
    error: () => {
      console.log("리뷰 리스트 불러오기 실패");
    },
  });
}
