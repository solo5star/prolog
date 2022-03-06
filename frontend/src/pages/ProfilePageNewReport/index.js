import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';
import { requestGetAbilities, requestPostReport } from '../../service/requests';
import { UserContext } from '../../contexts/UserProvider';

import { Button } from '../../components';
import StudylogModal from './StudylogModal';
import ReportInfoInput from './ReportInfoInput';
import ReportStudylogTable from './ReportStudylogTable';
import AbilityGraph from '../ProfilePageReports/AbilityGraph';

import { COLOR, ERROR_MESSAGE, REPORT_DESCRIPTION } from '../../constants';
import { limitLetterLength } from '../../utils/validator';

import { Checkbox, Form, FormButtonWrapper } from './style';

const ProfilePageNewReport = () => {
  const { username } = useParams();
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { isLoggedIn, accessToken } = user;

  const nickname = user.nickname ?? user.username;

  useEffect(() => {
    if (isLoggedIn) {
      if (username !== user.username) {
        alert('본인의 리포트만 작성할 수 있습니다.');
        history.push(`/${username}/reports`);
      }
    } else {
      if (!accessToken) {
        alert('로그인한 사용자만 이용할 수 있습니다.');
        history.push(`/${username}/reports`);
      }
    }
  }, [isLoggedIn, username, user.data, history, accessToken]);

  const [isMainReport, setIsMainReport] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [Studylogs, setStudylogs] = useState([]);
  const [StudylogAbilities, setStudylogAbilities] = useState([]);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const postNewReport = async (data) => {
    try {
      const response = await requestPostReport(data, accessToken);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      history.push(`/${username}/reports`);
    } catch (error) {
      const errorCode = JSON.parse(error.message).code;

      if (ERROR_MESSAGE[errorCode]) {
        alert(ERROR_MESSAGE[errorCode]);
      } else {
        console.error(error);
      }
    }
  };

  const getCheckedAbility = (StudylogId) => {
    const targetStudylogAbility = StudylogAbilities.find(
      (StudylogAbility) => StudylogAbility.id === StudylogId
    )?.abilities;

    return targetStudylogAbility?.map((ability) => ability.id) ?? [];
  };

  const onSubmitReport = async (event) => {
    event.preventDefault();

    const currTitle = title.trim();

    if (!limitLetterLength(description, REPORT_DESCRIPTION.MAX_LENGTH)) {
      alert('리포트 설명은 150글자를 넘을 수 없습니다.');

      return;
    }

    if (Studylogs.length === 0) {
      if (!window.confirm('등록된 학습로그가 없습니다.\n저장하시겠습니까?')) return;
    }

    const data = {
      id: null,
      title:
        currTitle !== '' ? currTitle : `${new Date().toLocaleDateString()} ${nickname}의 리포트`,
      description,
      abilityGraph: {
        abilities: abilities.map(({ id, weight, isPresent }) => ({ id, weight, isPresent })),
      },
      studylogs: Studylogs.map((item) => ({
        id: item.id,
        abilities: getCheckedAbility(item.id),
      })),
      represent: isMainReport,
    };

    await postNewReport(data);
  };

  const onCancelWriteReport = () => {
    if (window.confirm('리포트 작성을 취소하시겠습니까?')) {
      history.push(`/${username}/reports`);
    }
  };

  useRequest(
    [],
    () => requestGetAbilities(username, accessToken),
    (data) => {
      const parents = data.filter((item) => item.isParent);

      setAbilities(() =>
        parents.map(({ id, name, color }) => ({
          id,
          name,
          color,
          weight: Math.ceil(10 * Number((1 / parents.length).toFixed(2))),
          percentage: Number((1 / parents.length).toFixed(2)),
          isPresent: true,
        }))
      );
    }
  );

  const onRegisterMainReport = () => setIsMainReport((currentState) => !currentState);

  const onModalOpen = () => setIsModalOpened(true);

  const onModalClose = () => setIsModalOpened(false);

  const onChangeAbilities = (data) => {
    setAbilities(data);
  };

  return (
    <>
      <Form onSubmit={onSubmitReport}>
        <h2>새 리포트 작성하기</h2>
        <div>
          <Checkbox
            type="checkbox"
            onChange={onRegisterMainReport}
            checked={isMainReport}
            id="main_report_checkbox"
          />
          <label htmlFor="main_report_checkbox">대표 리포트로 지정하기</label>
        </div>

        <ReportInfoInput
          nickname={nickname}
          title={title}
          setTitle={setTitle}
          desc={description}
          setDescription={setDescription}
        />

        <AbilityGraph abilities={abilities} setAbilities={onChangeAbilities} mode="NEW" />

        <ReportStudylogTable
          onModalOpen={onModalOpen}
          Studylogs={Studylogs}
          setStudylogs={setStudylogs}
          abilities={abilities}
          StudylogAbilities={StudylogAbilities}
          setStudylogAbilities={setStudylogAbilities}
        />

        <FormButtonWrapper>
          <Button
            size="X_SMALL"
            css={{ backgroundColor: `${COLOR.LIGHT_GRAY_400}` }}
            type="button"
            onClick={onCancelWriteReport}
          >
            취소
          </Button>
          <Button size="X_SMALL">리포트 등록</Button>
        </FormButtonWrapper>
      </Form>

      {isModalOpened && (
        <StudylogModal
          onModalClose={onModalClose}
          username={username}
          Studylogs={Studylogs}
          setStudylogs={setStudylogs}
        />
      )}
    </>
  );
};

export default ProfilePageNewReport;