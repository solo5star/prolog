import ERROR_CODE from './errorCode';

const CONFIRM_MESSAGE = {
  DELETE_STUDYLOG: '글을 삭제하시겠습니까?',
  DELETE_SCRAP: '스크랩을 취소하시겠습니까?',
  DELETE_LIKE: '좋아요를 취소하시겠습니까?',
  TEMP_SAVE_STUDYLOG: '글을 저장하시겠습니까?',
};

const ALERT_MESSAGE = {
  ACCESS_DENIED: '잘못된 접근입니다.',
  FAIL_TO_DELETE_STUDYLOG: '글을 삭제할 수 없습니다.',
  FAIL_TO_UPLOAD_IMAGE: '이미지 업로드를 할 수 없습니다.',
  FAIL_TO_POST_LEVELLOG: '레벨로그 작성에 실패했습니다.',
  FAIL_TO_POST_ESSAY_ANSWER: '글 작성에 실패했습니다.',
  FAIL_TO_DELETE_ESSAY_ANSWER: '글 삭제에 실패했습니다.',
  NEED_TO_LOGIN: '로그인 후 이용 가능합니다',
  OVER_PROFILE_NICKNAME_MAX_LENGTH: '닉네임은 4글자 이하로 입력해주세요.',
  NO_EXIST_POST: '존재하지 않는 글입니다.',

  CANNOT_EDIT_OTHERS: '본인이 작성하지 않은 글은 수정할 수 없습니다.',
  NO_CONTENT: '내용을 입력하세요',
  NO_TITLE: '제목을 입력하세요',
  NO_TITLE_OR_CONTENT: '제목이나 내용을 입력하세요',
  NO_QUESTION_AND_ANSWER: '질답을 완성해주세요',
  NO_QNA: '적어도 하나의 질답을 작성해주세요.',
};

const ERROR_MESSAGE = {
  DEFAULT: '에러가 발생했습니다. 관리자에게 문의해 주세요',
  LOGIN_DEFAULT: '로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.',

  1000: '깃허브 로그인에 실패했습니다. 다시 로그인해 주세요.',
  1001: '깃허브 로그인에 실패했습니다. 다시 로그인해 주세요.',
  1002: '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.',
  1004: '존재하지 않는 회원입니다.',

  [ERROR_CODE.NO_CONTENT]: '글 내용을 작성해 주세요.',
  [ERROR_CODE.NO_TITLE]: '글 제목을 입력해 주세요.',

  [ERROR_CODE.SERVER_ERROR]: '서버가 응답하지 않습니다. 프롤로그 팀에 문의 주세요.',

  FAIL_TO_EDIT_STUDYLOG: '글을 수정할 수 없습니다. 다시 시도해주세요',
};

const SUCCESS_MESSAGE = {
  CREATE_POST: '글이 작성되었습니다.',
  EDIT_POST: '글이 수정되었습니다.',
  TEMP_SAVE_POST: '글이 임시저장되었습니다.',
  DELETE_STUDYLOG: '글이 삭제되었습니다.',
};

const PLACEHOLDER = {
  POST_TITLE: '제목을 입력해주세요',
  POST_CONTENT: '학습로그를 작성해주세요',
  TAG: '#태그선택',
};

const SNACKBAR_MESSAGE = {
  SUCCESS_TO_SCRAP: '스크랩을 완료했습니다.',
  DELETE_SCRAP: '스크랩을 취소했습니다.',

  SET_LIKE: '좋아요를 표시했습니다.',
  UNSET_LIKE: '좋아요를 취소했습니다.',
  ERROR_SET_LIKE: '좋아요 표시에 실패했습니다.',
  ERROR_UNSET_LIKE: '좋아요 취소에 실패했습니다.',
};

export {
  CONFIRM_MESSAGE,
  ALERT_MESSAGE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  PLACEHOLDER,
  SNACKBAR_MESSAGE,
};
