package wooteco.prolog.fixtures;

import wooteco.prolog.studylog.application.dto.StudylogRequest;
import wooteco.prolog.studylog.application.dto.TagRequest;

import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static wooteco.prolog.fixtures.TagAcceptanceFixture.*;

public enum PostAcceptanceFixture {
    POST1(
            "[자바][옵셔널] 학습log 제출합니다.",
            "옵셔널은 NPE를 배제하기 위해 만들어진 자바8에 추가된 라이브러리입니다. \n " +
                    "다양한 메소드를 호출하여 원하는 대로 활용할 수 있습니다",
            1L,
            TAG1,
            TAG2
    ),
    POST2(
            "[자바스크립트][비동기] 학습log 제출합니다.",
            "모던 JS의 fetch문, ajax라이브러리인 axios등을 통해 비동기 요청을 \n " +
                    "편하게 할 수 있습니다. 자바 최고",
            2L,
            TAG3,
            TAG4
    ),
    POST3(
            "[자료구조] 자료구조는 어려워요",
            "진짜 어려움",
            1L,
            TAG1,
            TAG5
    ),
    POST4(
            "[DOM] DOM DOM Dance",
            "덤덤 댄스 아니고",
            2L
    ),
    POST5(
            "[알고리즘] 자료구조의 big O에 관하여",
            "big O는 small O보다 크다",
            2L,
            TAG5,
            TAG6
    ),
    POST6(
            "새로운 스터디로그",
            "옵셔널은 NPE를 배제하기 위해 만들어진 자바8에 추가된 라이브러리입니다. \n " +
                    "다양한 메소드를 호출하여 원하는 대로 활용할 수 있습니다",
            1L,
            TAG1,
            TAG2
    );

    PostAcceptanceFixture(
            String title,
            String content,
            Long missionId,
            TagAcceptanceFixture... tags) {
        this.tags = Arrays.asList(tags);
        List<TagRequest> tagRequests = Arrays.stream(tags)
                .map(TagAcceptanceFixture::getTagRequest)
                .collect(toList());
        this.studylogRequest = new StudylogRequest(title, content, missionId, tagRequests);
    }

    private final StudylogRequest studylogRequest;
    private final List<TagAcceptanceFixture> tags;

    public StudylogRequest getPostRequest() {
        return studylogRequest;
    }

    public static List<StudylogRequest> findByMissionNumber(Long missionId) {
        return Arrays.stream(PostAcceptanceFixture.values())
                .map(PostAcceptanceFixture::getPostRequest)
                .filter(it -> it.getMissionId().equals(missionId))
                .collect(toList());
    }

    public static List<StudylogRequest> findByTagNumber(Long tagId) {
        return Arrays.stream(PostAcceptanceFixture.values())
                .filter(it -> it.tags.stream().anyMatch(tag -> tag.getTagId().equals(tagId)))
                .map(PostAcceptanceFixture::getPostRequest)
                .collect(toList());
    }
}
