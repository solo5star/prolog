/** @jsxImportSource @emotion/react */

import {Card, ProfileChip} from '../../components';
import {FlexStyle, JustifyContentSpaceBtwStyle} from '../../styles/flex.styles';
import {
  CardInner,
  IssuedDate,
  ProfileChipStyle,
  SubHeader,
  SubHeaderRightContent,
  Title,
  ViewerWrapper,
} from './styles';

import defaultProfileImage from '../../assets/images/no-profile-image.png';

// 마크다운
import {Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight
  from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import {Link} from 'react-router-dom';

const Content = ({ essayAnswer }) => {
  const { author = null, quiz, answer = '', createdAt = null } = essayAnswer;

  return (
    <Card size="LARGE">
      <CardInner>
        <div>
          <SubHeader>
            <SubHeaderRightContent>
              <IssuedDate>{new Date(createdAt).toLocaleString('ko-KR')}</IssuedDate>
            </SubHeaderRightContent>
          </SubHeader>

          <div css={[FlexStyle, JustifyContentSpaceBtwStyle]}>
            <Title>{quiz.question}</Title>
          </div>

          <Link to={`/${author?.username}`}>
            <ProfileChip
              imageSrc={author?.imageUrl || defaultProfileImage}
              cssProps={ProfileChipStyle}
            >
              {author?.nickname}
            </ProfileChip>
          </Link>
        </div>

        <ViewerWrapper>
          {answer && (
            <Viewer
              key={answer}
              initialValue={answer}
              extendedAutolinks={true}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          )}
        </ViewerWrapper>
      </CardInner>
    </Card>
  );
};

export default Content;
